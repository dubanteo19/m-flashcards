// service
export async function generateAIContent(
    prompt: string,
) {
    const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to generate AI content");
    }

    return await res.json();
}