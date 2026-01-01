'use client';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="text-lg font-bold tracking-tighter">
                        {"<Yousfi/>"}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        © 2025 Yousfi Souhaib. All rights reserved.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-4 md:mt-0">
                    <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link href="https://github.com/yousfisouhaib0810-commits" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 inline-block">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link href="https://linkedin.com/in/souhaib-yousfi-0a12a93a4" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 inline-block">
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link href="mailto:yousfisouhaib0810@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors p-2 inline-block">
                            <Mail className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
