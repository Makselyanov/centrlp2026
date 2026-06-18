import { AlertTriangle, RefreshCw } from "lucide-react";

interface AppFallbackProps {
  kind?: "loading" | "recovering" | "error";
}

export function AppFallback({ kind = "loading" }: AppFallbackProps) {
  const isError = kind === "error";
  const isRecovering = kind === "recovering";

  const title = isRecovering
    ? "Обновляем страницу"
    : isError
      ? "Страница не загрузилась"
      : "Загружаем страницу";

  const text = isRecovering
    ? "Откроем свежую версию сайта автоматически."
    : isError
      ? "Обновите страницу или перейдите на главную."
      : "Подготавливаем содержимое раздела.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          {isError ? <AlertTriangle className="h-7 w-7" /> : <RefreshCw className="h-7 w-7 animate-spin" />}
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{text}</p>
        {isError && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-button transition-colors hover:bg-primary/90"
            >
              Обновить
            </button>
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              На главную
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
