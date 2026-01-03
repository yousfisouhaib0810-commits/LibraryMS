'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Layers, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl?: string | null;
    tags: string[];
    demoUrl?: string | null;
    githubUrl?: string | null;
}

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Advanced scroll lock that works on iOS and modern browsers
        if (selectedProject) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        return () => {
            // Clean up on unmount
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    useEffect(() => {
        const fetchProjects = async () => {
            const fallbackProjects: Project[] = [
                {
                    id: 1,
                    title: "LibraryMS",
                    description: "A comprehensive Library Management System designed to streamline book tracking and member management.",
                    tags: ["Next.js", "NestJS", "PostgreSQL", "Tailwind"],
                    imageUrl: "/projects/library.jpg"
                },
                {
                    id: 2,
                    title: "Codilli",
                    description: "An advanced digital marketplace platform focusing on secure transactions and instant delivery.",
                    tags: ["React", "Node.js", "MongoDB", "Stripe"],
                    imageUrl: "/projects/codilli.jpg"
                },
                {
                    id: 3,
                    title: "Uber Clone",
                    description: "A feature-rich ride-sharing application with real-time tracking and route optimization.",
                    tags: ["React Native", "Google Maps", "Firebase"],
                    imageUrl: "/projects/uber.jpg"
                }
            ];

            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://library-backend-vtqw.onrender.com';
                const response = await fetch(`${API_URL}/projects`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setProjects(data);
                    } else {
                        setProjects(fallbackProjects);
                    }
                } else {
                    setProjects(fallbackProjects);
                }
            } catch (error) {
                console.error("Failed to fetch projects, using fallback:", error);
                setProjects(fallbackProjects);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <section id="projects" className="py-24 relative scroll-mt-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured <span className="text-gradient">Projects</span></h2>
                            <p className="text-muted-foreground text-lg">
                                A curated selection of my recent work, focusing on performance, user experience, and robust architecture.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                            <Layers className="w-4 h-4" />
                            <span>{projects.length} Projects Total</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="glass-morphism h-[400px] p-6 flex flex-col gap-4">
                                    <Skeleton className="h-48 w-full rounded-xl" />
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-20 w-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                </div>
                            ))
                        ) : projects.length === 0 ? (
                            <div className="col-span-full text-center py-20 glass-morphism">
                                <p className="text-muted-foreground">No projects found in the archive.</p>
                            </div>
                        ) : (
                            projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="group"
                                >
                                    <div className="glass-morphism h-full flex flex-col overflow-hidden hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] transition-all duration-500">
                                        {/* Image Area */}
                                        <div
                                            className="relative h-56 w-full bg-accent/20 overflow-hidden cursor-pointer"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            {project.imageUrl ? (
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    priority={index < 2}
                                                />
                                            ) : (
                                                <div className="w-full h-full relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-opacity group-hover:opacity-100 opacity-50" />
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-3xl font-black text-white/5 uppercase tracking-tighter group-hover:scale-110 transition-transform duration-700">
                                                            {project.title.split(' ')[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-accent border border-border text-muted-foreground">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[85vh] flex flex-col bg-card md:border border-border md:rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Sticky Header for Mobile */}
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-end z-20 pointer-events-none">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="pointer-events-auto p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col md:grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden">
                                <div className="relative h-64 md:h-full bg-accent/20 flex-shrink-0">
                                    {selectedProject.imageUrl ? (
                                        <img
                                            src={selectedProject.imageUrl}
                                            alt={selectedProject.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                                            <Layers className="w-16 h-16 text-white/10" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-8 flex flex-col overflow-y-auto">
                                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-2 md:mt-0">{selectedProject.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                                        {selectedProject.description}
                                    </p>

                                    <div className="space-y-6 mt-auto pb-8 md:pb-0">
                                        <div>
                                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-accent/50 text-foreground text-xs md:text-sm font-medium border border-border">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}


