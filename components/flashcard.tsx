"use client";
import { FlashcardView } from "@/app/lib/types";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AudioLinesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useState } from "react";
import { Button } from "./ui/button";
import { LanguageCode, languageMap } from "@/app/lib/enums";

interface FlashcardProps {
    card: FlashcardView,
    language: LanguageCode
}
export default function Flashcard({ card, language }: FlashcardProps) {
    const t = useTranslations("learn.card");
    const [isFlipped, setIsFlipped] = useState(false);
    const handlePlaySound = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (!window.speechSynthesis) return;
        const lang = languageMap[language];
        const voices = window.speechSynthesis.getVoices();
        // Prefer high quality voices first
        const voice =
            voices.find(
                v =>
                    v.lang === lang &&
                    v.name.toLowerCase().includes("google")
            ) ||
            voices.find(
                v =>
                    v.lang === lang &&
                    v.name.toLowerCase().includes("microsoft")
            ) ||
            voices.find(v => v.lang === lang) ||
            voices.find(v => v.lang.startsWith(language));

        const utterance = new SpeechSynthesisUtterance(card.word);

        utterance.lang = lang;
        utterance.voice = voice || null;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };
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
                    <div className="relative inline-block">
                        <h2 className="text-5xl tracking-tighter">
                            {card.word}
                        </h2>

                        <Button
                            onClick={handlePlaySound}
                            size="icon"
                            className="absolute -top-3 -right-10 rounded-full"
                            variant="destructive"
                        >
                            <AudioLinesIcon className="size-4" />
                        </Button>
                    </div>

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