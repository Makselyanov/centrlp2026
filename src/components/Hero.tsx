import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export const Hero = () => {
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);

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
            card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', reset);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', reset);
        };
    }, []);

    return (
        <section
            id="hero"
            className="
                relative overflow-hidden
                w-full
                bg-gradient-to-br from-[#040f1e] via-[#050b16] to-[#040f1e]
                text-slate-50
                py-24
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.20),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(45,212,191,0.18),transparent_60%)]
                    opacity-70
                "
            />

            {/* Dynamic Background - Subtle Parallax Feel */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#0096D6]/10 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#44B78B]/10 blur-[120px]"
                />
            </div>

            <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-left max-w-xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/60 shadow-md text-slate-100 text-sm font-semibold mb-8 border border-[#0096D6]/20"
                    >
                        <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44B78B] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#44B78B]"></span>
                        </span>
                        AI-Маркетинг 2.0
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-slate-50">
                        Запускаем продажи <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                            с помощью AI
                        </span>, чат-ботов и умной рекламы
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                        Комплексная упаковка бизнеса: сайт, соцсети, AI-боты, воронки и реклама.
                        <span className="font-semibold text-slate-50"> Первые заявки через 14 дней.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/ai-plan')}
                            className="px-8 py-4 bg-[#0096D6] text-white rounded-2xl font-semibold text-lg shadow-lg shadow-[#0096D6]/30 flex items-center justify-center gap-2 transition-all"
                        >
                            Получить план внедрения
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-transparent text-slate-300 border border-slate-700 rounded-2xl font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Наши услуги
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Content - 3D Object Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative flex-1 flex items-center justify-center perspective-1000 h-[600px]"
                >
                    {/* Background Wrapper with WebGL */}
                    <div className="hero-3d-wrapper">
                        <div className="webgl" data-us-project="jSQIShw8nRxgcNnhfv18"></div>
                    </div>

                    {/* 3D Card Content */}
                    <div ref={cardRef} className="hero-card">
                        <div className="card-inner w-[320px] h-[520px] bg-gradient-to-br from-[#0096D6] to-[#44B78B] rounded-[60px] shadow-2xl flex items-center justify-center relative overflow-hidden group transform transition-transform hover:scale-105 duration-500">
                            {/* Glass effect overlay */}
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-10" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent z-20" />

                            {/* Content inside the placeholder */}
                            <div className="relative z-30 text-white text-center p-8">
                                <Zap className="w-24 h-24 mx-auto mb-6 text-white drop-shadow-lg" />
                                <div className="text-4xl font-bold mb-2 drop-shadow-md">AI POWER</div>
                                <p className="text-lg font-medium opacity-90">Усиливаем с помощью ИИ</p>
                            </div>

                            {/* Shine effect */}
                            <div className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/40 to-transparent rotate-45 animate-shine pointer-events-none" />
                        </div>
                    </div>

                    {/* Floating Elements around the object */}
                    <motion.div
                        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-32 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-30 border border-white/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#44B78B]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-lg">+127%</div>
                                <div className="text-xs text-slate-500">Рост продаж</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-40 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-30 border border-white/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0096D6]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-lg">24/7</div>
                                <div className="text-xs text-slate-500">Работает AI-Бот</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Glow for the Object */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0096D6]/20 to-[#44B78B]/20 rounded-full blur-[100px] -z-10" />
                </motion.div>
            </div>
        </section>
    );
};
