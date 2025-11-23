import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero3D from "../assets/hero/hero_3d_object_1763931506533.png";

export const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
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

            <div className="container mx-auto px-4 relative z-10 pt-20 pb-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left order-2 lg:order-1"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md text-[#0096D6] text-sm font-semibold mb-8 border border-[#0096D6]/20"
                        >
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44B78B] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#44B78B]"></span>
                            </span>
                            AI-Маркетинг 2.0
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-slate-900">
                            Запускаем продажи <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                                с помощью AI
                            </span>, чат-ботов и умной рекламы
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                            Комплексная упаковка бизнеса: сайт, соцсети, AI-боты, воронки и реклама.
                            <span className="font-semibold text-slate-900"> Первые заявки через 14 дней.</span>
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
                                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Наши услуги
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative flex items-center justify-center perspective-1000 order-1 lg:order-2"
                    >
                        <motion.div
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-20"
                        >
                            <img
                                src={Hero3D}
                                alt="AI Marketing Rocket"
                                className="h-[280px] sm:h-[340px] w-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Background Glow for the Object */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#0096D6]/20 to-[#44B78B]/20 rounded-full blur-[80px] -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
