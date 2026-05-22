"use client";

import { QuizSession } from "@/app/lib/types/quiz";
import FullPageLoader from "@/components/loader";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { Button } from "@/components/ui/button";
import { useCollectionBySlug } from "@/hooks/useColleciton";
import { createQuizSession } from "@/services/quiz.service";
import { use, useState } from "react";
import { CollectionNotFound } from "@/components/not-found/collection-not-found";

export default function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { data: collection, isLoading } = useCollectionBySlug(slug);
    const cardCount = collection?.cards?.length ?? 0;
    const [session, setSession] = useState<QuizSession | null>(null);
    const handleStartQuiz = () => {
        if (collection) {
            setSession(
                createQuizSession(
                    collection.id,
                    collection.cards ?? []
                )
            );
        }
    };
    if (isLoading) return <FullPageLoader />;
    if (!collection) return (<CollectionNotFound />)
    if (!session) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6">
                <h1 className="text-3xl font-bold">
                    {collection.title}
                </h1>
                <p className="text-muted-foreground">
                    {cardCount > 0 ? `${cardCount} questions` : 'No questions available'}
                </p>
                <Button
                    size="lg"
                    onClick={handleStartQuiz}
                >
                    Start Quiz
                </Button>
            </div>
        );
    }

    return (
        <QuizPlayer
            session={session}
            setSession={setSession}
        />
    );
}