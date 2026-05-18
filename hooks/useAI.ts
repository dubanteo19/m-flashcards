// hook
import { LanguageCode } from "@/app/lib/enums";
import { generateAIContent } from "@/services/aiService";
import { useMutation } from "@tanstack/react-query";
type AIGenerateParams = {
    topic: string;
    language: LanguageCode;
};
export function useAIGenerate() {
    return useMutation({
        mutationFn: ({
            topic,
            language,
        }: AIGenerateParams) => generateAIContent(topic, language),
    });
}