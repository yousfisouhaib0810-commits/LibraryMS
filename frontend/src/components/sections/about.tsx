'use client';

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code2, Cpu, Globe, GraduationCap, Layout, Server } from "lucide-react";

const technicalSkills = [
    {
        title: "Frontend",
        icon: <Layout className="w-4 h-4" color="#3b82f6" />,
        items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"]
    },
    {
        title: "Backend",
        icon: <Server className="w-4 h-4" color="#8b5cf6" />,
        items: ["Node.js", "Express", "NestJS", "JWT", "REST API"]
    },
    {
        title: "Database",
        icon: <Cpu className="w-4 h-4" color="#10b981" />,
        items: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Supabase"]
    },
    {
        title: "Mobile",
        icon: <Globe className="w-4 h-4" color="#f59e0b" />,
        items: ["React Native", "Expo"]
    },
    {
        title: "Tools",
        icon: <Code2 className="w-4 h-4" color="#ef4444" />,
        items: ["Git", "Docker", "Vercel", "Postman", "Figma"]
    }
];

export function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">About Me</h2>
                        <p className="text-muted-foreground text-lg">
                            Passionate about building software that solves real-world problems.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bio Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 p-8 glass-morphism flex flex-col justify-between"
                    >
                        <div>
                            <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-6">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Hi, I'm Souhaib</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                                A full-stack developer specializing in building web and mobile applications. I’m constantly improving my skills and transforming complex ideas into simple, elegant digital experiences that combine performance and creativity.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                                As a computer science student, I have a strong technical foundation that gives me the advantage in developing secure and reliable applications. When I’m not coding, you’ll probably find me exploring CTF challenges or reading a new book to broaden my knowledge.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-accent border border-border text-foreground/80">Computer Science Student</div>
                            <div className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-accent border border-border text-foreground/80">Full Stack Developer</div>
                        </div>
                    </motion.div>

                    {/* Technical Skills Bento */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 glass-morphism border-primary/20"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-foreground">Technical <span className="text-gradient">Arsenal</span></h3>
                            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">What I use to build</p>
                        </div>

                        <div className="grid gap-6">
                            {technicalSkills.map((category) => (
                                <div key={category.title} className="group">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 rounded-lg bg-accent border border-border group-hover:border-primary/50 transition-colors">
                                            {category.icon}
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-tighter">{category.title}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.items.map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.05 }}
                                                className="px-2.5 py-1 rounded-md bg-accent/50 border border-border text-[10px] font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-default"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
