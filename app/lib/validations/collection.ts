import { z } from "zod";

export const collectionSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(150).default(""),
    sourceText: z.string().max(3000).default(""),
    prompt: z.string().max(3000).default(""),
    isAIMode: z.boolean(),
    wordCount: z.number().min(10).max(80),
    isPublished: z.boolean(),
    jsonInput: z.string().min(1, "Cards JSON is required"),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;