"use client";
import { FlashcardView } from "@/app/lib/types";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Flashcard({ card }: { card: FlashcardView }) {
    const t = useTranslations("learn.card");
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 shadow-xl">
                    <span className="text-sm text-muted-foreground mb-2">{t("front")}</span>
                    <h2 className="text-5xl  tracking-tighter">{card.word}</h2>
                    <p className="mt-4 text-muted-foreground italic">{t("clickToFlip")}</p>
                </Card>

                {/* Back Side */}
                <Card
                    className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 shadow-xl bg-primary text-primary-foreground"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <span className="text-sm opacity-70 mb-2">{t("meaning")}</span>
                    <h3 className="mb-1">{card.reading}</h3>
                    <p className="text-3xl font-bold">{card.meaning}</p>
                </Card>
            </motion.div>
        </div>
    );
}