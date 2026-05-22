import { QuizSession } from "@/app/lib/types/quiz";

export function QuizResult({
    session,
}: {
    session: QuizSession;
}) {
    const score = session.answers.filter((a) => a.correct).length;

    const percentage = Math.round((score / session.questions.length) * 100);

    return (
        <div className="mx-auto max-w-3xl space-y-8 p-8">
            <h3>Quiz Result</h3>
            <div className="text-center">
                <h1>{percentage}%</h1>
                <p className="text-muted-foreground">
                    {score}/{session.questions.length} correct
                </p>
            </div>
            <div className="space-y-4 flex flex-col">
                {session.questions.map(
                    (q) => {
                        const answer = session.answers.find((a) =>
                            a.questionId === q.id
                        );
                        return (
                            <div
                                key={q.id}
                                className="rounded-xl border p-4"
                            >
                                <h3 className="font-semibold">{q.prompt}</h3>
                                <p>Your: {" "}{answer?.selected}</p>
                                <p>Correct: {" "}{q.correctAnswer}</p>
                                <p>{answer?.correct ? "✅ Correct" : "❌ Wrong"}</p>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}