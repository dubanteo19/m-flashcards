import { Card } from "@/app/lib/types/cards";

export type QuizType = | "word_to_meaning" | "meaning_to_word"

export interface QuizQuestion {
    id: string;
    card: Card;
    prompt: string;
    correctAnswer: string;
    choices: string[];

    type: QuizType;
}

export interface QuizAnswer {
    questionId: string;
    selected: string;
    correct: boolean;
}

export interface QuizSession {
    id: string;
    collectionId: string;

    questions: QuizQuestion[];
    answers: QuizAnswer[];

    currentIndex: number;

    startedAt: number;
    completedAt?: number;
}