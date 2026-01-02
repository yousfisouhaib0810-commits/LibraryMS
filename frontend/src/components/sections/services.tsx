'use client';

import { motion } from "framer-motion";
import { Monitor, Smartphone, Zap } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "Full-stack web applications using modern technologies like React, Next.js, Node.js, and more. From responsive landing pages to complex web platforms.",
        icon: <Monitor className="w-8 h-8" />,
        color: "blue"
    },
    {
        title: "Android Development",
        description: "Cross-platform mobile applications using React Native. Build once, deploy everywhere with native performance and user experience.",
        icon: <Smartphone className="w-8 h-8" />,
        color: "emerald"
    }
];

export function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-2xl mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">My <span className="text-gradient">Services</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Transforming your vision into powerful, modern web and mobile experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="glass-morphism p-8 hover:border-blue-500/40 group transition-all duration-300"
                        >
                            <div className={`p-4 rounded-2xl w-fit mb-6 bg-${service.color}-500/10 text-${service.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
