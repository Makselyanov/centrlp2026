export const TIKTOK_MAX_FILE_BYTES = 64 * 1024 * 1024;
export const TIKTOK_MAX_TITLE_UNITS = 2200;

export type TikTokPostMode = "inbox" | "direct";

export interface TikTokCreator {
  avatarUrl: string;
  nickname: string;
  username: string;
  privacyOptions: string[];
  commentDisabled: boolean;
  duetDisabled: boolean;
  stitchDisabled: boolean;
  maxVideoDurationSeconds: number;
}

export interface TikTokConnectionStatus {
  configured: boolean;
  complianceApproved?: boolean;
  connected: boolean;
  csrfToken: string;
  consentVersion: string;
  creator?: TikTokCreator;
}

export interface TikTokPreparePayload {
  mode: TikTokPostMode;
  title: string;
  privacyLevel: string | null;
  disableComment: boolean;
  disableDuet: boolean;
  disableStitch: boolean;
  brandContentToggle: boolean;
  brandOrganicToggle: boolean;
  isAigc: boolean;
  consent: {
    rightsAndMusic: true;
    publish: true;
    dataTransfer: true;
    version: string;
  };
  file: {
    name: string;
    size: number;
    type: string;
    durationSeconds: number;
  };
}

export interface TikTokPrepareResponse {
  ticketId: string;
}

export interface TikTokUploadResponse {
  publishId: string;
  mode: TikTokPostMode;
}

export type TikTokPublishState =
  | "PROCESSING"
  | "PUBLISH_COMPLETE"
  | "SEND_TO_USER_INBOX"
  | "FAILED";

export interface TikTokPublishStatus {
  status: TikTokPublishState;
  failReason?: string;
}

interface ApiErrorBody {
  error?: string | { message?: string; code?: string };
  message?: string;
  code?: string;
}

export class TikTokApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "TikTokApiError";
    this.status = status;
    this.code = code;
  }
}

async function readJson<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }

  let body: ApiErrorBody | null = null;
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = null;
  }

  const nestedError = typeof body?.error === "object" ? body.error : undefined;
  const message =
    nestedError?.message ||
    body?.message ||
    (typeof body?.error === "string" ? body.error : undefined) ||
    "TikTok API временно недоступен. Повторите попытку.";
  const code = nestedError?.code || body?.code;

  throw new TikTokApiError(message, response.status, code);
}

function csrfHeaders(csrfToken: string): HeadersInit {
  return {
    "X-CSRF-Token": csrfToken,
  };
}

export async function getTikTokStatus(signal?: AbortSignal): Promise<TikTokConnectionStatus> {
  const response = await fetch("/api/tiktok/status", {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    signal,
  });

  return readJson<TikTokConnectionStatus>(response);
}

export function connectTikTok(): void {
  window.location.assign("/api/tiktok/connect");
}

export async function disconnectTikTok(csrfToken: string): Promise<void> {
  const response = await fetch("/api/tiktok/disconnect", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...csrfHeaders(csrfToken),
    },
  });

  await readJson<unknown>(response);
}

export async function prepareTikTokPost(
  csrfToken: string,
  payload: TikTokPreparePayload,
  signal?: AbortSignal,
): Promise<TikTokPrepareResponse> {
  const response = await fetch("/api/tiktok/prepare", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...csrfHeaders(csrfToken),
    },
    body: JSON.stringify(payload),
    signal,
  });

  return readJson<TikTokPrepareResponse>(response);
}

export async function uploadTikTokVideo(
  csrfToken: string,
  ticketId: string,
  file: File,
  signal?: AbortSignal,
): Promise<TikTokUploadResponse> {
  const response = await fetch(`/api/tiktok/upload/${encodeURIComponent(ticketId)}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": getTikTokVideoMimeType(file) || "application/octet-stream",
      ...csrfHeaders(csrfToken),
    },
    body: file,
    signal,
  });

  return readJson<TikTokUploadResponse>(response);
}

export async function getTikTokPublishStatus(
  csrfToken: string,
  publishId: string,
  signal?: AbortSignal,
): Promise<TikTokPublishStatus> {
  const response = await fetch("/api/tiktok/publish-status", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...csrfHeaders(csrfToken),
    },
    body: JSON.stringify({ publishId }),
    signal,
  });

  return readJson<TikTokPublishStatus>(response);
}

export function getTikTokVideoMimeType(file: Pick<File, "name" | "type">): string | null {
  const allowedMimeTypes = new Set([
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-m4v",
  ]);
  const normalizedType = file.type.toLocaleLowerCase();
  if (allowedMimeTypes.has(normalizedType)) return normalizedType;

  if (normalizedType) return null;

  const extension = file.name.split(".").pop()?.toLocaleLowerCase();
  if (extension === "mp4") return "video/mp4";
  if (extension === "webm") return "video/webm";
  if (extension === "mov") return "video/quicktime";
  if (extension === "m4v") return "video/x-m4v";
  return null;
}

export function getTikTokPrivacyLabel(value: string): string {
  const labels: Record<string, string> = {
    PUBLIC_TO_EVERYONE: "Все пользователи",
    MUTUAL_FOLLOW_FRIENDS: "Друзья",
    FOLLOWER_OF_CREATOR: "Подписчики",
    SELF_ONLY: "Только я",
  };

  return labels[value] || value.split("_").join(" ").toLocaleLowerCase("ru-RU");
}

export function formatVideoDuration(seconds: number): string {
  const roundedSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
