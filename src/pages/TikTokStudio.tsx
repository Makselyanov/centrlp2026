import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  FileVideo2,
  Inbox,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  Send,
  ShieldCheck,
  Unplug,
  UploadCloud,
  X,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  connectTikTok,
  disconnectTikTok,
  formatFileSize,
  formatVideoDuration,
  getTikTokPrivacyLabel,
  getTikTokPublishStatus,
  getTikTokStatus,
  getTikTokVideoMimeType,
  prepareTikTokPost,
  TIKTOK_MAX_FILE_BYTES,
  TIKTOK_MAX_TITLE_UNITS,
  TikTokApiError,
  TikTokConnectionStatus,
  TikTokCreator,
  TikTokPostMode,
  uploadTikTokVideo,
} from "@/lib/tiktok";

type ResultKind = "inbox" | "published" | "processing";

interface ActionResult {
  kind: ResultKind;
  title: string;
  description: string;
}

interface OAuthNotice {
  destructive: boolean;
  title: string;
  description: string;
}

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SELF_ONLY = "SELF_ONLY";
const POLL_ATTEMPTS = 25;
const POLL_INTERVAL_MS = 2000;

function getOAuthNotice(status: string | null): OAuthNotice | null {
  if (!status) return null;
  const messages: Record<string, OAuthNotice> = {
    connected: {
      destructive: false,
      title: "TikTok подключен",
      description: "Профиль и доступные настройки публикации обновлены.",
    },
    cancelled: {
      destructive: false,
      title: "Подключение отменено",
      description: "TikTok не передал доступ. Вы можете повторить подключение позже.",
    },
    invalid_oauth_state: {
      destructive: true,
      title: "Срок подключения истек",
      description: "Начните подключение заново с этой страницы.",
    },
    wrong_tiktok_account: {
      destructive: true,
      title: "Подключен другой аккаунт",
      description: "Для Центра ЛП разрешен только аккаунт @centrlp.",
    },
    authorization_expired: {
      destructive: true,
      title: "Авторизация истекла",
      description: "Подключите аккаунт @centrlp заново.",
    },
    missing_oauth_code: {
      destructive: true,
      title: "TikTok не завершил подключение",
      description: "Повторите подключение с этой страницы.",
    },
  };
  return (
    messages[status] || {
      destructive: true,
      title: "Подключение не завершено",
      description: "Повторите попытку или свяжитесь с Центром ЛП.",
    }
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof TikTokApiError) return error.message;
  return "Не удалось связаться с TikTok. Проверьте подключение и повторите попытку.";
}

function getCreatorInitials(creator: TikTokCreator): string {
  const value = creator.nickname || creator.username || "TikTok";
  return value
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.slice(0, 1))
    .join("")
    .toLocaleUpperCase("ru-RU");
}

function waitForNextPoll(signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      window.clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve();
    }, POLL_INTERVAL_MS);
    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange,
}: ToggleRowProps) {
  return (
    <div className="flex min-h-16 items-center justify-between gap-5 py-3">
      <div className="min-w-0">
        <Label htmlFor={id} className={cn("text-sm font-semibold", disabled && "text-muted-foreground")}>
          {label}
        </Label>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-describedby={`${id}-description`}
      />
      <span id={`${id}-description`} className="sr-only">
        {description}
      </span>
    </div>
  );
}

function PageIntro() {
  return (
    <section className="border-b bg-card pt-20">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex max-w-3xl items-start gap-4">
          <img
            src="/images/brand/centrlp-logo-48.webp"
            width="48"
            height="48"
            alt="Логотип Центр ЛП"
            className="mt-1 h-12 w-12 shrink-0 rounded-xl border bg-white object-contain p-1 shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Центр ЛП</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">TikTok Content Studio</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Подготовьте ролик, проверьте настройки аккаунта и передайте видео в TikTok только после
              явного подтверждения.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-primary" aria-hidden="true" />
            Доступ остается на защищенном сервере
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Публикация только после согласия
          </span>
        </div>
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Проверяем подключение TikTok">
      <Skeleton className="h-28 w-full rounded-2xl" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Skeleton className="h-[34rem] rounded-2xl" />
        <Skeleton className="h-[42rem] rounded-2xl" />
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Alert variant="destructive" className="bg-card">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>Не удалось проверить подключение</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={onRetry}>
            <RefreshCw aria-hidden="true" />
            Повторить проверку
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

function UnavailableState({
  connected,
  isDisconnecting,
  error,
  onDisconnect,
}: {
  connected: boolean;
  isDisconnecting: boolean;
  error: string | null;
  onDisconnect: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Card className="border-primary/15 shadow-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <Unplug className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Подключение TikTok сейчас недоступно</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
            Сервис не принимает файлы и не выполняет публикации. Вернитесь позже или свяжитесь с Центром ЛП.
          </p>
          {connected ? (
            <>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Ранее подключенный аккаунт можно отключить даже во время этой паузы.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-5"
                disabled={isDisconnecting}
                onClick={onDisconnect}
              >
                {isDisconnecting ? (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                ) : (
                  <Unplug aria-hidden="true" />
                )}
                Отключить аккаунт
              </Button>
            </>
          ) : null}
          {error ? (
            <p className="mt-4 text-sm font-medium text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function DisconnectedState() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-primary/15 shadow-card">
        <CardContent className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_0.85fr] md:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <UploadCloud className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">Подключите свой аккаунт TikTok</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              TikTok покажет запрашиваемые разрешения до входа. Content Studio не получает пароль от
              вашего аккаунта.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-6 w-full shadow-button sm:w-auto"
              onClick={connectTikTok}
              data-metric="tiktok_connect"
            >
              Подключить TikTok
              <Send aria-hidden="true" />
            </Button>
          </div>
          <div className="border-t pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-sm font-semibold">Что вы разрешаете</p>
            <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
              {[
                "Показать имя, аватар и доступные настройки публикации",
                "Передать только выбранный вами видеофайл",
                "Опубликовать ролик только после отдельного подтверждения",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResultNotice({ result }: { result: ActionResult }) {
  const isProcessing = result.kind === "processing";
  return (
    <Alert className={cn("border-primary/20 bg-secondary/50", isProcessing && "border-amber-300 bg-amber-50")}>
      {isProcessing ? (
        <Clock3 className="text-amber-700" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="text-primary" aria-hidden="true" />
      )}
      <AlertTitle>{result.title}</AlertTitle>
      <AlertDescription>{result.description}</AlertDescription>
    </Alert>
  );
}

export default function TikTokStudio() {
  const [oauthNotice] = useState<OAuthNotice | null>(() => {
    if (typeof window === "undefined") return null;
    return getOAuthNotice(new URLSearchParams(window.location.search).get("status"));
  });
  const [connection, setConnection] = useState<TikTokConnectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [privacyLevel, setPrivacyLevel] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [allowDuet, setAllowDuet] = useState(false);
  const [allowStitch, setAllowStitch] = useState(false);
  const [brandOrganic, setBrandOrganic] = useState(false);
  const [brandContent, setBrandContent] = useState(false);
  const [isAigc, setIsAigc] = useState(false);
  const [rightsConsent, setRightsConsent] = useState(false);
  const [publishConsent, setPublishConsent] = useState(false);
  const [dataTransferConsent, setDataTransferConsent] = useState(false);

  const [pendingMode, setPendingMode] = useState<TikTokPostMode | null>(null);
  const [progressLabel, setProgressLabel] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const submissionAbortRef = useRef<AbortController | null>(null);

  const applyConnection = useCallback((next: TikTokConnectionStatus) => {
    setConnection(next);
    setPrivacyLevel((current) =>
      next.creator?.privacyOptions.includes(current) ? current : "",
    );
    if (next.creator?.commentDisabled) setAllowComments(false);
    if (next.creator?.duetDisabled) setAllowDuet(false);
    if (next.creator?.stitchDisabled) setAllowStitch(false);
  }, []);

  const loadConnection = useCallback(
    async (signal?: AbortSignal) => {
      const next = await getTikTokStatus(signal);
      applyConnection(next);
      setLoadError(null);
    },
    [applyConnection],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has("status")) return;
    url.searchParams.delete("status");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    loadConnection(controller.signal)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(getErrorMessage(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [loadConnection]);

  useEffect(() => {
    return () => submissionAbortRef.current?.abort();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const creator = connection?.creator;
  const videoLimit = creator?.maxVideoDurationSeconds;
  const titleUnits = title.length;
  const titleTooLong = titleUnits > TIKTOK_MAX_TITLE_UNITS;
  const titleHasInvalidCharacter = title.includes("\u0000");
  const selfOnlyBrandConflict = privacyLevel === SELF_ONLY && brandContent;

  useEffect(() => {
    if (!videoFile || durationSeconds === null) return;

    if (!Number.isFinite(videoLimit) || !videoLimit || videoLimit <= 0) {
      setFileError("TikTok не вернул допустимую длительность видео. Обновите настройки аккаунта.");
      return;
    }

    if (durationSeconds > videoLimit) {
      setFileError(
        `Длительность ролика ${formatVideoDuration(durationSeconds)} превышает лимит ${formatVideoDuration(
          videoLimit,
        )}.`,
      );
      return;
    }

    setFileError(null);
  }, [durationSeconds, videoFile, videoLimit]);

  const handleRetry = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      await loadConnection();
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshCreator = async () => {
    setIsRefreshing(true);
    setLoadError(null);
    try {
      await loadConnection();
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connection?.csrfToken) return;
    submissionAbortRef.current?.abort();
    setIsDisconnecting(true);
    setSubmissionError(null);
    setActionResult(null);
    try {
      await disconnectTikTok(connection.csrfToken);
      await loadConnection();
    } catch (error) {
      setSubmissionError(getErrorMessage(error));
    } finally {
      setIsDisconnecting(false);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setPreviewUrl(null);
    setDurationSeconds(null);
    setFileError(null);
    setSubmissionError(null);
    setActionResult(null);
  };

  const acceptVideo = (candidate: File | undefined) => {
    if (!candidate) return;
    if (pendingMode) return;

    setVideoFile(null);
    setPreviewUrl(null);
    setDurationSeconds(null);
    setSubmissionError(null);
    setActionResult(null);

    if (!getTikTokVideoMimeType(candidate)) {
      setFileError("Выберите видео в формате MP4, WebM, MOV или M4V.");
      return;
    }

    if (candidate.name.length > 255 || candidate.name.includes("/") || candidate.name.includes("\\")) {
      setFileError("Имя видеофайла должно быть короче 256 символов.");
      return;
    }

    if (candidate.size > TIKTOK_MAX_FILE_BYTES) {
      setFileError("Размер видео превышает 64 МБ.");
      return;
    }

    if (candidate.size === 0) {
      setFileError("Выбранный видеофайл пуст.");
      return;
    }

    setVideoFile(candidate);
    setPreviewUrl(URL.createObjectURL(candidate));
    setDurationSeconds(null);
    setFileError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    acceptVideo(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    acceptVideo(event.dataTransfer.files?.[0]);
  };

  const handleVideoMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = event.currentTarget.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      setDurationSeconds(null);
      setFileError("Не удалось определить длительность видео. Выберите другой файл.");
      return;
    }
    setDurationSeconds(duration);
  };

  const getValidationError = (mode: TikTokPostMode): string | null => {
    if (!connection?.connected || !creator || !connection.csrfToken) {
      return "Подключите TikTok и обновите данные аккаунта.";
    }
    if (!videoFile) return "Сначала выберите видео.";
    if (fileError) return fileError;
    if (durationSeconds === null) return "Дождитесь проверки длительности видео.";
    if (titleTooLong) return "Сократите подпись до 2200 символов UTF-16.";
    if (titleHasInvalidCharacter) return "Подпись содержит недопустимый служебный символ.";
    if (!rightsConsent) return "Подтвердите права на видео, звук и музыку.";
    if (!publishConsent) return "Дайте явное согласие на выбранное действие.";
    if (!dataTransferConsent) return "Подтвердите передачу данных в TikTok.";
    if (!connection?.consentVersion) return "Не удалось проверить редакцию согласия. Обновите страницу.";
    if (mode === "direct" && !privacyLevel) return "Выберите видимость публикации.";
    if (mode === "direct" && selfOnlyBrandConflict) {
      return "Платное партнерство нельзя публиковать с видимостью «Только я».";
    }
    return null;
  };

  const handleSubmit = async (mode: TikTokPostMode) => {
    const validationError = getValidationError(mode);
    if (validationError) {
      setSubmissionError(validationError);
      return;
    }

    if (!connection?.csrfToken || !creator || !videoFile || durationSeconds === null) return;

    submissionAbortRef.current?.abort();
    const controller = new AbortController();
    submissionAbortRef.current = controller;
    let transferStarted = false;

    setPendingMode(mode);
    setProgressLabel("Готовим защищенную передачу");
    setSubmissionError(null);
    setActionResult(null);

    try {
      const prepared = await prepareTikTokPost(
        connection.csrfToken,
        {
          mode,
          title,
          privacyLevel: mode === "direct" ? privacyLevel : null,
          disableComment: creator.commentDisabled || !allowComments,
          disableDuet: creator.duetDisabled || !allowDuet,
          disableStitch: creator.stitchDisabled || !allowStitch,
          brandContentToggle: brandContent,
          brandOrganicToggle: brandOrganic,
          isAigc,
          consent: {
            rightsAndMusic: true,
            publish: true,
            dataTransfer: true,
            version: connection.consentVersion,
          },
          file: {
            name: videoFile.name,
            size: videoFile.size,
            type: getTikTokVideoMimeType(videoFile) || videoFile.type,
            durationSeconds,
          },
        },
        controller.signal,
      );

      setProgressLabel("Передаем видео в TikTok");
      transferStarted = true;
      const uploaded = await uploadTikTokVideo(
        connection.csrfToken,
        prepared.ticketId,
        videoFile,
        controller.signal,
      );

      setProgressLabel("TikTok обрабатывает видео");
      for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt += 1) {
        const current = await getTikTokPublishStatus(
          connection.csrfToken,
          uploaded.publishId,
          controller.signal,
        );

        if (current.status === "PUBLISH_COMPLETE") {
          setActionResult({
            kind: "published",
            title: "Публикация завершена",
            description: "TikTok подтвердил успешную публикацию видео.",
          });
          return;
        }

        if (current.status === "SEND_TO_USER_INBOX") {
          setActionResult({
            kind: "inbox",
            title: "Видео передано во входящие TikTok",
            description:
              "Откройте уведомление в приложении TikTok, проверьте ролик в редакторе и завершите публикацию там.",
          });
          return;
        }

        if (current.status === "FAILED") {
          setSubmissionError(current.failReason || "TikTok отклонил обработку видео.");
          return;
        }

        if (attempt < POLL_ATTEMPTS - 1) {
          await waitForNextPoll(controller.signal);
        }
      }

      setActionResult({
        kind: "processing",
        title: "TikTok продолжает обработку",
        description:
          "Видео уже передано. Проверьте результат в приложении TikTok перед повторной отправкой.",
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setSubmissionError(
        transferStarted
          ? "Не удалось подтвердить итог операции. Проверьте TikTok перед повторной отправкой."
          : getErrorMessage(error),
      );
    } finally {
      if (!controller.signal.aborted) {
        setPendingMode(null);
        setProgressLabel("");
      }
    }
  };

  const inboxReady =
    Boolean(videoFile) &&
    durationSeconds !== null &&
    !fileError &&
    !titleTooLong &&
    !titleHasInvalidCharacter &&
    rightsConsent &&
    publishConsent &&
    dataTransferConsent &&
    Boolean(connection?.consentVersion);
  const directReady = inboxReady && Boolean(privacyLevel) && !selfOnlyBrandConflict;

  return (
    <Layout title="TikTok Content Studio | Центр ЛП" description="Безопасно подключите TikTok, проверьте ролик и выберите передачу во входящие или прямую публикацию.">
      <div className="min-h-[70vh] bg-background">
        <PageIntro />
        {oauthNotice ? (
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <Alert variant={oauthNotice.destructive ? "destructive" : "default"}>
              {oauthNotice.destructive ? (
                <AlertCircle aria-hidden="true" />
              ) : (
                <CheckCircle2 aria-hidden="true" />
              )}
              <AlertTitle>{oauthNotice.title}</AlertTitle>
              <AlertDescription>{oauthNotice.description}</AlertDescription>
            </Alert>
          </div>
        ) : null}

        {isLoading ? (
          <LoadingState />
        ) : loadError && !connection ? (
          <ErrorState message={loadError} onRetry={handleRetry} />
        ) : !connection?.configured ? (
          <UnavailableState
            connected={false}
            isDisconnecting={false}
            error={null}
            onDisconnect={() => {}}
          />
        ) : connection.complianceApproved === false ? (
          <UnavailableState
            connected={connection.connected}
            isDisconnecting={isDisconnecting}
            error={submissionError}
            onDisconnect={handleDisconnect}
          />
        ) : !connection.connected || !creator ? (
          <DisconnectedState />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <Card className="border-primary/15 shadow-card">
              <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex min-w-0 items-center gap-4">
                  <Avatar className="h-14 w-14 border bg-muted">
                    <AvatarImage
                      src={creator.avatarUrl}
                      alt={`Аватар ${creator.nickname}`}
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback className="font-semibold text-primary">
                      {getCreatorInitials(creator)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-bold">{creator.nickname}</h2>
                      <Badge variant="secondary" className="text-primary">
                        Подключено
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="truncate">@{creator.username.replace(/^@/, "")}</span>
                      <span>
                        Видео до{" "}
                        {Number.isFinite(videoLimit) && videoLimit
                          ? formatVideoDuration(videoLimit)
                          : "неизвестного лимита"}
                      </span>
                      <span>Вариантов видимости: {creator.privacyOptions.length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isRefreshing || Boolean(pendingMode)}
                    onClick={handleRefreshCreator}
                  >
                    <RefreshCw className={cn(isRefreshing && "animate-spin")} aria-hidden="true" />
                    Обновить настройки
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isDisconnecting || Boolean(pendingMode)}
                    onClick={handleDisconnect}
                  >
                    {isDisconnecting ? (
                      <LoaderCircle className="animate-spin" aria-hidden="true" />
                    ) : (
                      <Unplug aria-hidden="true" />
                    )}
                    Отключить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {loadError ? (
              <Alert variant="destructive" className="mt-5 bg-card">
                <AlertCircle aria-hidden="true" />
                <AlertTitle>Не удалось обновить настройки</AlertTitle>
                <AlertDescription>{loadError}</AlertDescription>
              </Alert>
            ) : null}

            {actionResult ? (
              <div className="mt-5" aria-live="polite">
                <ResultNotice result={actionResult} />
              </div>
            ) : null}

            {submissionError ? (
              <Alert variant="destructive" className="mt-5 bg-card" aria-live="assertive">
                <AlertCircle aria-hidden="true" />
                <AlertTitle>Действие не выполнено</AlertTitle>
                <AlertDescription>{submissionError}</AlertDescription>
              </Alert>
            ) : null}

            {pendingMode ? (
              <Alert className="mt-5 border-primary/20 bg-secondary/50" aria-live="polite">
                <LoaderCircle className="animate-spin text-primary" aria-hidden="true" />
                <AlertTitle>{progressLabel}</AlertTitle>
                <AlertDescription>
                  Не закрывайте страницу до подтверждения результата.
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
              <Card className="overflow-hidden border-primary/15 shadow-card lg:sticky lg:top-24">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">1. Видео</p>
                      <h2 className="mt-1 text-xl font-bold">Предпросмотр ролика</h2>
                    </div>
                    {videoFile ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeVideo}
                        disabled={Boolean(pendingMode)}
                        aria-label="Удалить выбранное видео"
                      >
                        <X aria-hidden="true" />
                      </Button>
                    ) : null}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept=".mp4,.webm,.mov,.m4v,video/mp4,video/webm,video/quicktime,video/x-m4v"
                    onChange={handleFileChange}
                  />

                  {videoFile && previewUrl ? (
                    <div className="mt-5">
                      <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-slate-950">
                        <video
                          src={previewUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="max-h-[34rem] w-full object-contain"
                          onLoadedMetadata={handleVideoMetadata}
                          onError={() => {
                            setDurationSeconds(null);
                            setFileError("Не удалось открыть видео. Выберите другой файл.");
                          }}
                        >
                          Ваш браузер не поддерживает предпросмотр видео.
                        </video>
                      </div>
                      <div className="mt-4 min-w-0">
                        <p className="truncate text-sm font-semibold" title={videoFile.name}>
                          {videoFile.name}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                          <span>{formatFileSize(videoFile.size)}</span>
                          <span>
                            {durationSeconds === null
                              ? "Проверяем длительность"
                              : formatVideoDuration(durationSeconds)}
                          </span>
                          <span>
                            Лимит{" "}
                            {Number.isFinite(videoLimit) && videoLimit
                              ? formatVideoDuration(videoLimit)
                              : "не получен"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-primary/30 bg-secondary/30 px-6 py-10 text-center"
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
                        <FileVideo2 className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="mt-5 font-semibold">Выберите видео или перетащите файл</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                        MP4, WebM, MOV или M4V. Размер до 64 МБ. Длительность проверяется по лимиту вашего
                        аккаунта TikTok.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-5 bg-card"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud aria-hidden="true" />
                        Выбрать видео
                      </Button>
                    </div>
                  )}

                  {fileError ? (
                    <p className="mt-3 text-sm font-medium text-destructive" role="alert">
                      {fileError}
                    </p>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="border-primary/15 shadow-card">
                <CardContent className="p-5 sm:p-6">
                  <div>
                    <p className="text-sm font-semibold text-primary">2. Настройки</p>
                    <h2 className="mt-1 text-xl font-bold">Параметры публикации</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Доступные варианты получены из TikTok для подключенного аккаунта.
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-4">
                      <Label htmlFor="tiktok-title" className="font-semibold">
                        Подпись к видео
                      </Label>
                      <span
                        className={cn(
                          "text-xs tabular-nums text-muted-foreground",
                          (titleTooLong || titleHasInvalidCharacter) && "font-semibold text-destructive",
                        )}
                      >
                        {titleUnits} / {TIKTOK_MAX_TITLE_UNITS}
                      </span>
                    </div>
                    <Textarea
                      id="tiktok-title"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                        setSubmissionError(null);
                      }}
                      className={cn(
                        "mt-2 min-h-32 resize-y",
                        (titleTooLong || titleHasInvalidCharacter) && "border-destructive",
                      )}
                      placeholder="Коротко расскажите, о чем ролик"
                      disabled={Boolean(pendingMode)}
                      aria-invalid={titleTooLong || titleHasInvalidCharacter}
                    />
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Лимит считается в символах UTF-16, как требует TikTok.
                    </p>
                    {titleHasInvalidCharacter ? (
                      <p className="mt-2 text-sm font-medium text-destructive" role="alert">
                        Удалите недопустимый служебный символ из подписи.
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <Label htmlFor="tiktok-privacy" className="font-semibold">
                      Видимость
                    </Label>
                    <Select
                      value={privacyLevel || undefined}
                      onValueChange={(value) => {
                        setPrivacyLevel(value);
                        setSubmissionError(null);
                      }}
                      disabled={Boolean(pendingMode) || creator.privacyOptions.length === 0}
                    >
                      <SelectTrigger id="tiktok-privacy" className="mt-2">
                        <SelectValue placeholder="Выберите видимость" />
                      </SelectTrigger>
                      <SelectContent>
                        {creator.privacyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {getTikTokPrivacyLabel(option)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {creator.privacyOptions.length === 0 ? (
                      <p className="mt-2 text-sm text-destructive">
                        TikTok не вернул варианты видимости. Обновите настройки аккаунта.
                      </p>
                    ) : (
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        Значение не выбирается автоматически.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-base font-bold">Взаимодействия</h3>
                    <div className="mt-2 divide-y">
                      <ToggleRow
                        id="tiktok-comments"
                        label="Разрешить комментарии"
                        description={
                          creator.commentDisabled
                            ? "Недоступно для этого аккаунта или выбранных настроек"
                            : "Пользователи смогут комментировать ролик"
                        }
                        checked={allowComments}
                        disabled={creator.commentDisabled || Boolean(pendingMode)}
                        onCheckedChange={setAllowComments}
                      />
                      <ToggleRow
                        id="tiktok-duet"
                        label="Разрешить дуэты"
                        description={
                          creator.duetDisabled
                            ? "Недоступно для этого аккаунта или выбранных настроек"
                            : "Пользователи смогут создавать дуэты с роликом"
                        }
                        checked={allowDuet}
                        disabled={creator.duetDisabled || Boolean(pendingMode)}
                        onCheckedChange={setAllowDuet}
                      />
                      <ToggleRow
                        id="tiktok-stitch"
                        label="Разрешить Stitch"
                        description={
                          creator.stitchDisabled
                            ? "Недоступно для этого аккаунта или выбранных настроек"
                            : "Пользователи смогут использовать фрагмент ролика"
                        }
                        checked={allowStitch}
                        disabled={creator.stitchDisabled || Boolean(pendingMode)}
                        onCheckedChange={setAllowStitch}
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-base font-bold">Коммерческое содержание</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Отметьте все подходящие варианты. Для прямой публикации эти данные передаются
                      в TikTok. При передаче во входящие подтвердите их в приложении.
                    </p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="tiktok-own-brand"
                          checked={brandOrganic}
                          disabled={Boolean(pendingMode)}
                          onCheckedChange={(checked) => {
                            setBrandOrganic(checked === true);
                            setSubmissionError(null);
                          }}
                          className="mt-0.5"
                        />
                        <div>
                          <Label htmlFor="tiktok-own-brand" className="font-semibold">
                            Мой бренд или бизнес
                          </Label>
                          <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            Ролик продвигает ваш собственный бренд, продукт или услугу.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="tiktok-brand-content"
                          checked={brandContent}
                          disabled={Boolean(pendingMode) || (privacyLevel === SELF_ONLY && !brandContent)}
                          onCheckedChange={(checked) => {
                            setBrandContent(checked === true);
                            setSubmissionError(null);
                          }}
                          className="mt-0.5"
                        />
                        <div>
                          <Label
                            htmlFor="tiktok-brand-content"
                            className={cn(
                              "font-semibold",
                              privacyLevel === SELF_ONLY && !brandContent && "text-muted-foreground",
                            )}
                          >
                            Платное партнерство
                          </Label>
                          <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            Ролик продвигает сторонний бренд за оплату или другую выгоду.
                          </p>
                        </div>
                      </div>
                    </div>
                    {selfOnlyBrandConflict ? (
                      <p className="mt-3 text-sm font-medium text-destructive" role="alert">
                        Платное партнерство нельзя публиковать с видимостью «Только я».
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="tiktok-aigc"
                        checked={isAigc}
                        disabled={Boolean(pendingMode)}
                        onCheckedChange={(checked) => setIsAigc(checked === true)}
                        className="mt-0.5"
                      />
                      <div>
                        <Label htmlFor="tiktok-aigc" className="font-semibold">
                          Видео создано или существенно изменено с помощью ИИ
                        </Label>
                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                          TikTok получит отметку о контенте, созданном с помощью ИИ.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-base font-bold">Подтверждения</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="tiktok-rights-consent"
                          checked={rightsConsent}
                          disabled={Boolean(pendingMode)}
                          onCheckedChange={(checked) => {
                            setRightsConsent(checked === true);
                            setSubmissionError(null);
                          }}
                          className="mt-0.5"
                        />
                        <Label htmlFor="tiktok-rights-consent" className="text-sm font-normal leading-6">
                          У меня есть права на видео, звук и музыку, и их использование не нарушает
                          права третьих лиц.
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="tiktok-publish-consent"
                          checked={publishConsent}
                          disabled={Boolean(pendingMode)}
                          onCheckedChange={(checked) => {
                            setPublishConsent(checked === true);
                            setSubmissionError(null);
                          }}
                          className="mt-0.5"
                        />
                        <Label htmlFor="tiktok-publish-consent" className="text-sm font-normal leading-6">
                          Я явно разрешаю отправить или опубликовать это видео в TikTok в соответствии
                          с выбранным действием.
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="tiktok-data-transfer-consent"
                          checked={dataTransferConsent}
                          disabled={Boolean(pendingMode)}
                          onCheckedChange={(checked) => {
                            setDataTransferConsent(checked === true);
                            setSubmissionError(null);
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="tiktok-data-transfer-consent"
                          className="text-sm font-normal leading-6"
                        >
                          Я согласен на передачу в TikTok данных подключенного аккаунта, выбранного
                          видео, подписи и настроек для выполнения выбранного действия.{" "}
                          <a
                            href="/privacy#tiktok-content-studio"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            Как обрабатываются данные
                          </a>
                          .
                        </Label>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      Редакция согласия: {connection.consentVersion}
                    </p>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full"
                        disabled={Boolean(pendingMode) || !inboxReady}
                        onClick={() => handleSubmit("inbox")}
                        data-metric="tiktok_upload_inbox"
                      >
                        {pendingMode === "inbox" ? (
                          <LoaderCircle className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Inbox aria-hidden="true" />
                        )}
                        Передать во входящие
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        className="w-full shadow-button"
                        disabled={Boolean(pendingMode) || !directReady}
                        onClick={() => handleSubmit("direct")}
                        data-metric="tiktok_publish_direct"
                      >
                        {pendingMode === "direct" ? (
                          <LoaderCircle className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Send aria-hidden="true" />
                        )}
                        Опубликовать в TikTok
                      </Button>
                    </div>
                    <div className="mt-4 grid gap-3 text-xs leading-5 text-muted-foreground sm:grid-cols-2">
                      <p>
                        Во входящих TikTok вы сможете открыть редактор, проверить ролик и завершить
                        публикацию в приложении.
                      </p>
                      <p>
                        Прямая публикация использует выбранные на этой странице настройки и требует
                        видимость.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
