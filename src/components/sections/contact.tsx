'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
    const [formType, setFormType] = useState<'contact' | 'service'>('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        appName: "",
        duration: "",
        budget: ""
    });

    useEffect(() => {
        const handleFormTypeChange = (e: any) => {
            if (e.detail) {
                setFormType(e.detail);
                const targetId = 'contact-form-section-anchor';
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
                // Increased delay to ensure mobile menu closes and DOM is ready
            }
        };
        window.addEventListener('set-contact-form-type', handleFormTypeChange);
        return () => window.removeEventListener('set-contact-form-type', handleFormTypeChange);
    }, []);

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status !== 'idle') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            // Use local Next.js API route which handles Gmail SMTP
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, type: formType }),
            });

            // Add artificial delay for better UX (so it doesn't feel "too fast")
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (response.ok) {
                setFormData({ name: "", email: "", subject: "", message: "", appName: "", duration: "", budget: "" });
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="py-24 pb-32 md:pb-24 relative overflow-x-clip scroll-mt-24">
            {/* Subtle Glow Background - Responsive Size */}
            <div className="absolute top-100 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Contact</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Get in <span className="text-gradient">Touch</span></h2>
                    <p className="text-muted-foreground text-lg max-w-[600px] mx-auto font-light">
                        Ready to start your next project? Drop a message and let's build something extraordinary together.
                    </p>
                </div>

                <div id="contact-grid-container" className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info Bento */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6 w-full min-w-0"
                    >
                        <div className="p-6 md:p-8 glass-morphism flex flex-col justify-between h-full relative">
                            {/* Precise scroll target for Contact Info */}
                            <div id="scroll-target-point" className="absolute -top-[-400px] md:-top-12 outline-none" />
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Contact Info</h3>
                                <p className="text-muted-foreground text-sm mb-8 italic">Available for remote work worldwide.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="p-4 rounded-2xl bg-accent border border-border text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Email Me</div>
                                            <a href="mailto:yousfisouhaib0810@gmail.com" className="text-foreground font-medium hover:text-blue-400 transition-colors break-words text-sm sm:text-base">yousfisouhaib0810@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="p-4 rounded-2xl bg-accent border border-border text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">WhatsApp</div>
                                            <a href="https://wa.me/+213549047138" target="_blank" className="text-foreground font-medium hover:text-purple-400 transition-colors">+213 549047138</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="p-4 rounded-2xl bg-accent border border-border text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Socials</div>
                                            <div className="flex gap-3 mt-1">
                                                <a href="https://github.com/yousfisouhaib0810-commits" target="_blank" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-current/20">GitHub</a>
                                                <a href="https://www.linkedin.com/in/souhaib-yousfi-0a12a93a4" target="_blank" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-current/20">LinkedIn</a>
                                                <a href="https://t.me/yousfisouhaib" target="_blank" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-current/20">Telegram</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="text-foreground font-bold mb-2 italic">Current Location</div>
                                <div className="text-muted-foreground text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Algeria, GMT+1
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Bento */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 relative"
                    >
                        <div id="contact-form-container" className="contact-form-container p-4 md:p-8 glass-morphism overflow-hidden relative">
                            {/* Precise scroll target for the Form itself */}
                            <div id="contact-form-section-anchor" className="absolute -top-24 md:-top-32 outline-none" />
                            {/* Toggle Buttons - Optimized for mobile width */}
                            <div id="contact-form-anchor" className="flex p-1 bg-accent/20 rounded-2xl mb-8 border border-border w-full sm:w-fit">
                                <button
                                    onClick={() => setFormType('contact')}
                                    className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${formType === 'contact' ? 'bg-primary text-primary-foreground shadow-lg shadow-blue-500/20' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Quick Message
                                </button>
                                <button
                                    onClick={() => setFormType('service')}
                                    className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${formType === 'service' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Order a Service
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence mode="wait">
                                    {formType === 'contact' ? (
                                        <motion.div
                                            key="contact-form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Full Name</label>
                                                    <Input
                                                        name="name"
                                                        placeholder="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-accent/5 border-border h-14 md:h-12 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Email Address</label>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-accent/5 border-border h-14 md:h-12 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Your Message</label>
                                                <Textarea
                                                    name="message"
                                                    placeholder="Tell me about your project..."
                                                    className="min-h-[150px] bg-accent/5 border-border focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl resize-none"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="service-form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Full Name</label>
                                                    <Input
                                                        name="name"
                                                        placeholder="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-accent/5 border-border h-14 md:h-12 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Email Address</label>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-accent/5 border-border h-14 md:h-12 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">App / Company Name</label>
                                                    <Input
                                                        name="appName"
                                                        placeholder="e.g. My Awesome App"
                                                        value={formData.appName}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-accent/5 border-border h-14 md:h-12 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Expected Duration</label>
                                                    <select
                                                        name="duration"
                                                        value={formData.duration}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full bg-accent/5 border border-border h-14 md:h-12 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl px-4 text-foreground appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled className="bg-card">Select Duration</option>
                                                        <option value="less-than-1-week" className="bg-card">Less than 1 week</option>
                                                        <option value="1-2-weeks" className="bg-card">1 - 2 weeks</option>
                                                        <option value="2-4-weeks" className="bg-card">2 - 4 weeks</option>
                                                        <option value="1-2-months" className="bg-card">1 - 2 months</option>
                                                        <option value="more-than-2-months" className="bg-card">More than 2 months</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Budget Range ($)</label>
                                                    <select
                                                        name="budget"
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full bg-accent/5 border border-border h-14 md:h-12 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl px-4 text-foreground appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled className="bg-card">Select Budget</option>
                                                        <option value="below-500" className="bg-card">Below $500</option>
                                                        <option value="500-1000" className="bg-card">$500 - $1000</option>
                                                        <option value="1000-3000" className="bg-card">$1000 - $3000</option>
                                                        <option value="3000-5000" className="bg-card">$3000 - $5000</option>
                                                        <option value="above-5000" className="bg-card">Above $5000</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Project Description / Requirements</label>
                                                <Textarea
                                                    name="message"
                                                    placeholder="Describe your project, features you need, or any specific requirements..."
                                                    className="min-h-[120px] bg-accent/5 border-border focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl resize-none"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full h-14 md:h-16 text-lg font-black rounded-2xl transition-all shadow-xl text-white ${formType === 'contact' ? 'bg-primary hover:bg-primary/90 shadow-blue-500/30' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30'}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Transmitting...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-3 w-full uppercase tracking-[0.2em]">
                                                {formType === 'contact' ? 'Send Message' : 'Order a Service'}
                                                <Send className="w-5 h-5 text-current" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>

                            <AnimatePresence>
                                {status !== 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${status === 'success'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                                            }`}
                                    >
                                        <div className={`p-1.5 rounded-full ${status === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                                            {status === 'success' ? (
                                                <Sparkles className="w-4 h-4" />
                                            ) : (
                                                <div className="w-4 h-4 flex items-center justify-center font-bold">!</div>
                                            )}
                                        </div>
                                        {status === 'success'
                                            ? "Message transmitted successfully. I'll get back to you shortly."
                                            : "Transmission failed. Please ensure the backend is online or check your connection."}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
