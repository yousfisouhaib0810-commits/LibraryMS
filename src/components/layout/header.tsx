'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#scroll-target-point' },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Load initial theme
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open (Advanced Logic)
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    'pointer-events-auto flex items-center gap-2 md:gap-8 px-4 md:px-6 py-1.5 md:py-3 transition-all duration-500 rounded-full border border-border/40 mt-2 md:mt-6 max-w-[98vw] sm:max-w-fit',
                    scrolled
                        ? 'glass shadow-xl'
                        : 'bg-background/20 backdrop-blur-md border-border/20'
                )}
            >
                <Link href="#" className="flex items-center gap-2 group flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-lg font-bold tracking-tight text-foreground italic hidden xs:block">{"<Yousfi/>"}</span>
                </Link>

                {/* Mobile Header Buttons - Kept large for accessibility */}
                <div className="flex md:hidden flex-col gap-1 ml-1 sm:ml-2">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('set-contact-form-type', { detail: 'contact' }));
                        }}
                        className="bg-accent/80 border border-border/40 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider text-foreground whitespace-nowrap shadow-lg shadow-black/10"
                    >
                        Message
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('set-contact-form-type', { detail: 'service' }));
                        }}
                        className="bg-purple-600/90 border border-purple-400/40 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white whitespace-nowrap shadow-lg shadow-purple-500/10"
                    >
                        Service
                    </motion.button>
                </div>

                {/* Theme & Menu Group - Pins to the right */}
                <div className="flex items-center gap-1 ml-auto">
                    {/* Theme Toggle Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-3 rounded-full hover:bg-accent/50 text-foreground hover:text-primary transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-primary" />}
                    </motion.button>

                    {/* Mobile Menu Button - Enlarged */}
                    <button
                        className="md:hidden p-3 text-foreground/70 hover:text-foreground transition-colors flex-shrink-0"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 px-4">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </div>

                <div className="h-4 w-px bg-border hidden md:block" />

                <div className="hidden md:flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('set-contact-form-type', { detail: 'contact' }));
                        }}
                        className="bg-accent/50 hover:bg-accent border border-border/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-foreground transition-all"
                    >
                        Message Me
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('set-contact-form-type', { detail: 'service' }));
                        }}
                        className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-purple-400 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    >
                        Get Service
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Navigation Overlay - With smooth animation but optimized background */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-40 md:hidden bg-background p-4 flex flex-col justify-center items-center pointer-events-auto"
                    >
                        <nav className="flex flex-col gap-8 text-center items-center w-full max-w-sm">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    className="w-full"
                                >
                                    <a
                                        href={item.href}
                                        className="block w-full text-4xl font-black text-foreground hover:text-primary transition-colors italic"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 w-full flex justify-center"
                            >
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.dispatchEvent(new CustomEvent('set-contact-form-type', { detail: 'service' }));
                                    }}
                                    className="bg-primary hover:bg-primary/90 rounded-full px-12 py-6 text-xl shadow-none w-full max-w-[250px]"
                                >
                                    Start a Project
                                </Button>
                            </motion.div>
                        </nav>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-4 text-foreground hover:text-primary transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
