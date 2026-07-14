import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import type FluidSimulation from "webgl-fluid-enhanced";

export const Hero = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const fluidContainerRef = useRef<HTMLDivElement>(null);

    // WebGL Fluid Simulation — self-hosted open-source (MIT, PavelDoGreat).
    // All compute runs client-side, no external HTTP calls. Brand palette.
    useEffect(() => {
        const container = fluidContainerRef.current;
        if (!container) return;

        // Respect prefers-reduced-motion.
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (prefersReduced || isMobile) return;

        let sim: FluidSimulation | null = null;
        let cancelled = false;
        let idleId: number | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        // Wait for layout so container has non-zero dimensions before
        // the library runs its first resizeCanvas() — otherwise the canvas
        // initializes at 0×0 / 300×150 and the effect appears mispositioned.
        const start = async () => {
            if (container.clientWidth === 0 || container.clientHeight === 0) {
                requestAnimationFrame(() => void start());
                return;
            }
            const { default: WebGLFluidEnhanced } = await import("webgl-fluid-enhanced");
            if (cancelled) return;
            sim = new WebGLFluidEnhanced(container);
            sim.setConfig({
                simResolution: 128,
                dyeResolution: 1024,
                densityDissipation: 0.9,
                velocityDissipation: 0.25,
                pressure: 0.8,
                pressureIterations: 20,
                curl: 12,
                splatRadius: 0.2,
                splatForce: 4500,
                shading: true,
                colorful: false,
                colorUpdateSpeed: 5,
                colorPalette: ["#0096D6", "#44B78B", "#0096D6"],
                hover: true,
                backgroundColor: "#040f1e",
                transparent: true,
                brightness: 0.75,
                bloom: false,
                sunrays: false,
            });
            sim.start();
        };
        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(() => void start(), { timeout: 2500 });
        } else {
            timeoutId = setTimeout(() => void start(), 1500);
        }

        return () => {
            cancelled = true;
            if (idleId !== null) window.cancelIdleCallback(idleId);
            if (timeoutId !== null) clearTimeout(timeoutId);
            try {
                sim?.stop();
            } catch {
                /* noop */
            }
        };
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const rotateY = (e.clientX / innerWidth - 0.5) * 20;
            const rotateX = (e.clientY / innerHeight - 0.5) * -20;
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(16px)`;
        };

        const reset = () => {
            card.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", reset);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", reset);
        };
    }, []);

    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden hero-bg bg-gradient-to-br from-[#040f1e] via-[#050b16] to-[#040f1e] py-40 md:py-52 text-slate-50"
        >
            {/* Wrapper locks the fluid canvas to the hero. The library mutates
                the inline style of whatever container we hand it (sets
                position:relative + display:flex), so we pass it the inner
                div and keep absolute positioning on this outer wrapper. */}
            <div
                className="absolute inset-0 z-0 overflow-hidden opacity-90 mix-blend-screen"
                aria-hidden="true"
            >
                <div ref={fluidContainerRef} className="hero-fluid h-full w-full" />
            </div>

            <div className="container mx-auto relative z-10 pointer-events-none">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    <div className="w-full max-w-3xl text-left lg:basis-[58%] xl:max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 inline-flex items-center rounded-full border border-[#0096D6]/20 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 shadow-md"
                        >
                            <span className="relative mr-2 flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#44B78B] opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#44B78B]"></span>
                            </span>
                            Быстрый вход без рекламного бюджета
                        </motion.div>

                        <h1 className="mb-8 text-4xl font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl md:text-6xl xl:text-7xl">
                            Сайт не даёт заявки? <br />
                            <span className="bg-gradient-to-r from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent">
                                Найдём, где они теряются
                            </span>
                            {" "}за 48 часов
                        </h1>

                        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-slate-400">
                            Разбираем первый экран, форму, путь обращения, Метрику и смысл предложения, чтобы понять,
                            почему посетитель не становится заявкой.
                            <span className="font-semibold text-slate-50">
                                {" "}После разбора можно точечно доработать сайт, CRM, бота или нейросетевой сценарий.
                            </span>
                        </p>

                        <div className="flex flex-col gap-5 sm:flex-row">
                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow:
                                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
                                className="pointer-events-auto flex items-center justify-center gap-2 rounded-2xl bg-[#0096D6] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#0096D6]/30 transition-all"
                            >
                                Получить разбор заявок
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>

                            <motion.a
                                href="/proverka-saita-i-zayavok-za-48-chasov"
                                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="pointer-events-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-transparent px-8 py-4 text-lg font-semibold text-slate-300 shadow-sm transition-all backdrop-blur-sm"
                            >
                                <Play className="h-5 w-5 fill-current" />
                                Цена от 15 000 ₽
                            </motion.a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="perspective-1000 relative flex h-[600px] flex-1 items-center justify-center"
                    >
                        <div ref={cardRef} className="hero-card">
                            <div className="group relative flex h-[520px] w-[320px] transform items-center justify-center overflow-hidden rounded-[60px] bg-gradient-to-br from-[#0096D6] to-[#44B78B] shadow-2xl transition-transform duration-500 hover:scale-105">
                                <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-sm" />
                                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />

                                <div className="relative z-30 p-8 text-center text-white">
                                    <Zap className="mx-auto mb-6 h-24 w-24 text-white drop-shadow-lg" />
                                    <div className="mb-2 text-4xl font-bold drop-shadow-md">ЗАЯВКИ</div>
                                    <p className="text-lg font-medium opacity-90">Сайт, CRM и нейросетевые сценарии</p>
                                </div>

                                <div className="pointer-events-none absolute -left-[100%] -top-[100%] h-[200%] w-[200%] rotate-45 animate-shine bg-gradient-to-br from-transparent via-white/40 to-transparent" />
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -right-4 top-32 z-30 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-[#44B78B]">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-slate-800">+127%</div>
                                    <div className="text-xs text-slate-500">Рост эффективности</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -left-8 bottom-40 z-30 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#0096D6]">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-slate-800">24/7</div>
                                    <div className="text-xs text-slate-500">Работает цифровой сервис</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0096D6]/20 to-[#44B78B]/20 blur-[100px]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
