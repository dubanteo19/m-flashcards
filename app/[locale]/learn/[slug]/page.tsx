"use client";

import { ROUTES } from "@/app/lib/constants";
import { Card } from "@/app/lib/types";
import { Flag } from "@/components/flag-icon";
import Flashcard from "@/components/flashcard";
import FullPageLoader from "@/components/loader";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { useCollectionBySlug } from "@/hooks/useColleciton";
import { cn, shuffleArray } from "@/lib/utils";
import { historyService } from "@/services/historyService";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useTranslations } from "next-intl";
import { use, useCallback, useEffect, useState } from "react";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations("learn");
    const { data: collection, isLoading } = useCollectionBySlug(slug);
    const [isDragging, setIsDragging] = useState(false);
    const [shuffledCards, setShuffledCards] = useState<Card[] | null>(null);
    const [[page, direction], setPage] = useState([0, 0]);
    const cards = shuffledCards || collection?.cards || [];
    const currentIndex = ((page % cards.length) + cards.length) % cards.length;
    const handleShuffle = () => {
        setShuffledCards(shuffleArray(cards));
        setPage([0, 0]);
    };
    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    // 1. Keyboard Navigation Logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") paginate(-1);
            if (e.key === "ArrowRight") paginate(1);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [paginate]);
    // 2. Swipe Logic
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };
    useEffect(() => {
        if (collection) {
            historyService.addToHistory(collection);
        }
    }, [collection]);

    if (isLoading) return <FullPageLoader />
    if (!collection || cards.length === 0) return (
        <div className="min-h-screen flex-center flex-col ">
            <p className="mb-4">No cards found in this collection.</p>
            <LinkButton href={ROUTES.DASHBOARD}>Back to Library</LinkButton>
        </div>
    )

    return (
        <div className="flex-1 bg-slate-50 flex justify-center items-center flex-col  p-4 overflow-hidden">
            <Flag
                size="md"
                language={collection.language} />
            <div className="mb-2">
                <h2 className="text-center">{collection.title}</h2>
                <p className="text-muted-foreground text-sm max-w-md  mx-auto my-2 italic">
                    {collection.description}
                </p>

                <p className="text-primary font-medium text-center">
                    {t("cardProgress", { current: currentIndex + 1, total: cards.length })}
                </p>

            </div>
            <div className="relative shadow  w-full max-w-md lg:h-64  flex-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(e, info) => {
                            onDragEnd(e, info);
                            setTimeout(() => setIsDragging(false), 100);
                        }}
                        className={cn("w-full", isDragging ? "pointer-events-none" : "pointer-events-auto")}
                    >
                        <Flashcard card={cards[currentIndex]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-4 items-baseline">
                <Button variant="outline" size="lg" onClick={() => paginate(-1)}>
                    <ChevronLeft className="mr-2 size-4" /> {t("previous")}
                </Button>
                <ActionButton label={t("shuffle")} size="sm" variant="destructive" className="mt-4" onClick={handleShuffle}>
                    <Shuffle className="size-4" />
                </ActionButton>
                <Button size="lg" onClick={() => paginate(1)}>
                    {t("next")} <ChevronRight className="ml-2 size-4" />
                </Button>

            </div>
        </div >
    );
}

const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
};