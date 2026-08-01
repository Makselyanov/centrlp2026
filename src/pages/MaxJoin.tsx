import { useEffect } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const MAX_CHANNEL_URL = "https://max.ru/join/zpSpjbmt3HibgqvFdhV-hkYOrifNzHnMUQzejqijFgc";

const MaxJoin = () => {
  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(MAX_CHANNEL_URL);
    }, 500);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,150,214,0.34),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(68,183,139,0.24),transparent_45%)]" />

      <section className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] shadow-lg shadow-cyan-950/40">
          <MessageCircle className="h-8 w-8" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          CentrLP в MAX
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Переходим в канал CentrLP
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-300">
          Откроем MAX автоматически. Если переход не начался, нажмите кнопку ниже.
        </p>

        <a
          href={MAX_CHANNEL_URL}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Открыть канал в MAX
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </a>

        <a href="/" className="mt-5 inline-block text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">
          Вернуться на centrlp.ru
        </a>
      </section>
    </main>
  );
};

export default MaxJoin;
