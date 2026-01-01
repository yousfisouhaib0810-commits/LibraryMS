'use client';

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden scroll-mt-24">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--accent),var(--background))]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                        x: [0, 50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.4, 0.1],
                        x: [0, -30, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Open for New Projects</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8 leading-[1.1] text-foreground">
                            Hello, I'm <br />
                            <span className="text-gradient">Yousfi Souhaib</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-10 leading-relaxed font-light">
                            And I'm a <span className="text-foreground font-medium">Full Stack Developer</span>. <br className="hidden md:block" />
                            Specializing in web and mobile applications, building scalable and user-friendly solutions.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="#projects"
                                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all"
                                >
                                    View Projects
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="https://github.com/yousfisouhaib0810-commits"
                                    target="_blank"
                                    className="px-8 py-4 rounded-full border border-border glass-morphism hover:bg-accent transition-all text-foreground font-semibold flex items-center gap-2"
                                >
                                    GitHub Profile
                                    <Github className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Visual Element with Premium Continuous Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative block mt-12 lg:mt-0"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Animated Background Glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-primary/20 rounded-full blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.1)]"
                            />

                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 1, 0, -1, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 w-full h-full glass rounded-[2.5rem] overflow-hidden border border-border/40 p-3 shadow-2xl"
                            >
                                <div className="w-full h-full bg-card rounded-[2rem] flex items-center justify-center border border-border/10 relative group overflow-hidden">
                                    {/* No background patterns for image clarity */}

                                    <motion.div
                                        animate={{
                                            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-full h-full relative z-10 overflow-hidden scale-95 origin-center"
                                    >
                                        <motion.img
                                            src="/souhaib.jpg"
                                            alt="Yousfi Souhaib"
                                            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 1.2 }}
                                        />
                                    </motion.div>

                                    {/* Removed hover overlay for clarity */}
                                </div>
                            </motion.div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
                                className="absolute -top-6 -right-6 w-20 h-20 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"
                            />
                            <motion.div
                                animate={{ y: [0, 25, 0], x: [0, -15, 0], rotate: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                                className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"
                            />
                        </div>

                        {/* Experience Grid Bento Element - Responsive Hide */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute -bottom-6 -right-6 p-6 glass-morphism z-20 hidden xl:block border border-border/50"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-foreground">100%</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Commitment</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
