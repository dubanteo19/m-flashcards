"use client";

import { AnimatePresence, motion } from "framer-motion";

interface EncouragementPopupProps {
    open: boolean;
    message?: string;
}

export default function EncouragementPopup({
    open,
    message,
}: EncouragementPopupProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 80,
                        scale: 0.6,
                        rotate: -8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: 30,
                        scale: 0.8,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                    }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            relative overflow-hidden
                            rounded-2xl
                            px-7 py-4
                            shadow-2xl
                            border border-white/10
                            bg-gradient-to-r from-primary via-primary to-primary/80
                            backdrop-blur-xl
                        "
                    >

                        <div className="relative flex items-center gap-3">
                            <div>
                                <p className="text-primary-foreground font-bold text-lg">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}