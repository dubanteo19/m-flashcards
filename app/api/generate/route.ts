import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

const vocabItem = z.object({
    word: z.string(),
    reading: z.string(),
    meaning: z.string(),
});

export async function POST(req: Request) {
    const { topic, language } = await req.json();
    const { output } = await generateText({
        model: google("gemini-2.5-flash"),
        output: Output.array({
            element: vocabItem,
        }),
        prompt: `
Generate exactly 15 ${language} vocabulary words about ${topic}.

Each item must contain:
- word
- reading
- meaning
`,
    });

    return Response.json(output);
}