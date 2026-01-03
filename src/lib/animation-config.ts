// Framer Motion performance optimizations
export const defaultTransition = {
    type: "tween",
    ease: "easeInOut",
};

export const fastTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
};

// Use these for better performance on mobile
export const reducedMotionTransition = {
    duration: 0.01,
};

// Viewport settings for animations
export const defaultViewport = {
    once: true,
    margin: "-50px",
    amount: 0.3,
};
