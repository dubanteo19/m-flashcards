"use client";

import { Card as CardType, Collection } from "@/app/lib/types";
import Flashcard from "@/components/flashcard";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { collectionService } from "@/services/collectionService";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [[page, direction], setPage] = useState([0, 0]);

    useEffect(() => {
        async function loadData() {
            const collection = await collectionService.getCollectionBySlug(slug);
            setCollection(collection);
            setCards(collection.cards);
            setLoading(false);
        }
        loadData();
    }, [slug]);

    const currentIndex = Math.abs(page % (cards.length || 1));

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    if (loading) return <Loader />

    if (!collection || cards.length === 0) return <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">No cards found in this collection.</p>
        <Link href="/"><Button>Back to Library</Button></Link>
    </div>

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">{collection.title}</h2>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-2 italic">
                    {collection.description}
                </p>
                <p className="text-primary font-medium">
                    Card {currentIndex + 1} of {cards.length}
                </p>
            </div>

            <div className="relative w-full max-w-md h-64 flex justify-center items-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants} // Your existing variants
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full"
                    >
                        <Flashcard card={cards[currentIndex]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-10">
                <Button variant="outline" size="lg" onClick={() => paginate(-1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button size="lg" onClick={() => paginate(1)}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <Link href="/" className="mt-12 text-sm text-muted-foreground flex items-center hover:text-primary transition-colors">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Back to Library
            </Link>
        </div>
    );
}

const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
};