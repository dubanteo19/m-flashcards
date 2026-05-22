import { Card } from "@/app/lib/types/cards";
import { QuizQuestion, QuizSession, QuizType } from "@/app/lib/types/quiz";

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

function randomQuizType(): QuizType {
    const types: QuizType[] = [
        "word_to_meaning",
        "meaning_to_word",
    ];

    return types[Math.floor(Math.random() * types.length)];
}

function buildQuestion(
    card: Card,
    pool: Card[]
): QuizQuestion {
    const type = randomQuizType();

    let prompt = "";
    let correctAnswer = "";
    let wrongAnswers: string[] = [];

    if (type === "word_to_meaning") {
        prompt = card.word;
        correctAnswer = card.meaning;

        wrongAnswers = shuffle(
            pool
                .filter((c) => c.id !== card.id)
                .map((c) => c.meaning)
        ).slice(0, 3);
    }

    if (type === "meaning_to_word") {
        prompt = card.meaning;
        correctAnswer = card.word;

        wrongAnswers = shuffle(
            pool
                .filter((c) => c.id !== card.id)
                .map((c) => c.word)
        ).slice(0, 3);
    }


    return {
        id: crypto.randomUUID(),
        card,
        prompt,
        correctAnswer,
        choices: shuffle([
            correctAnswer,
            ...wrongAnswers,
        ]),
        type,
    };
}

export function createQuizSession(
    collectionId: string,
    cards: Card[]
): QuizSession {
    const questions = shuffle(cards).map((card) => buildQuestion(card, cards));

    return {
        id: crypto.randomUUID(),
        collectionId,
        questions,
        answers: [],
        currentIndex: 0,
        startedAt: Date.now(),
    };
}