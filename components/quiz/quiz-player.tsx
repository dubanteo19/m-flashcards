"use client";

import { QuizSession } from "@/app/lib/types/quiz";
import { QuizResult } from "@/components/quiz/quiz-result";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface QuizPlayerProps {
    session: QuizSession;
    setSession: (s: QuizSession) => void;
}

export function QuizPlayer({
    session,
    setSession,
}: QuizPlayerProps) {
    const question = session.questions[session.currentIndex];

    const [selected, setSelected] = useState<string | null>(null);

    if (!question) return <QuizResult session={session} />

    const handleAnswer = (choice: string) => {
        setSelected(choice);
    };

    const next = () => {
        if (!selected) return;
        const correct = selected === question.correctAnswer;
        setSession({
            ...session,
            currentIndex: session.currentIndex + 1,
            answers: [
                ...session.answers,
                {
                    questionId:
                        question.id,
                    selected,
                    correct,
                },
            ],
        });

        setSelected(null);
    };

    const progress = ((session.currentIndex + 1) / session.questions.length) * 100;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-8 p-8">
            <div>
                <div className="mb-2 text-sm text-muted-foreground">
                    Question {session.currentIndex + 1} /{" "}
                    {session.questions.length}
                </div>

                <div className="h-2 rounded bg-muted">
                    <div
                        className="h-full rounded bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="h-32 w-full flex items-center justify-center px-8">
                <h2 className="w-full text-center text-3xl font-bold break-words overflow-hidden">
                    {question.prompt}
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 min-h-[160px]">
                {question.choices.map(
                    (choice) => {
                        const isSelected = selected === choice;
                        return (
                            <Button
                                key={choice}
                                variant={isSelected ? "default" : "outline"}
                                className="h-20 text-lg whitespace-normal"
                                onClick={() => handleAnswer(choice)}
                            >
                                {choice}
                            </Button>
                        );
                    }
                )}
            </div>

            {selected && (
                <Button
                    className="w-full"
                    size="lg"
                    onClick={next}
                >
                    Next
                </Button>
            )}
        </div>
    );
}