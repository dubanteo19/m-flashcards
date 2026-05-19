import { AIGenerateRequest } from "@/app/lib/request.type";
import { buildPrompt } from "@/components/prompt-tempate";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";


type Locale = "en" | "vi";

const vocabItem = z.object({
    word: z.string().max(20),
    reading: z.string().max(30),
    meaning: z.string().max(30),
});

export async function POST(req: Request) {
    const {
        sourceText,
        language,
    }: AIGenerateRequest = await req.json();

    const { output } = await generateText({
        model: google("gemini-3-flash-preview"),
        output: Output.array({
            element: vocabItem,
        }),
        prompt: buildPrompt(sourceText, language),
    });

    return Response.json(output);
}

