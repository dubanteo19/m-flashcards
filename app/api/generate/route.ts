import { AIGenerateRequest } from "@/app/lib/request.type";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

const vocabItem = z.object({
  word: z.string().max(20),
  reading: z.string().max(30),
  meaning: z.string().max(30),
});

export async function POST(req: Request) {
  const { prompt }: AIGenerateRequest = await req.json();

  const { output } = await generateText({
    model: google("gemini-3-flash-preview"),
    output: Output.array({
      element: vocabItem,
    }),
    prompt,
  });

  return Response.json(output);
}
