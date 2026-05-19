// hook
import { LanguageCode } from "@/app/lib/enums";
import { AIGenerateRequest } from "@/app/lib/request.type";
import { generateAIContent } from "@/services/aiService";
import { useMutation } from "@tanstack/react-query";
export function useAIGenerate() {
    return useMutation({
        mutationFn: ({
            sourceText,
            language,
        }: AIGenerateRequest) => generateAIContent(sourceText, language),
    });
}