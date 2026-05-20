// hook
import { AIGenerateRequest } from "@/app/lib/request.type";
import { generateAIContent } from "@/services/aiService";
import { useMutation } from "@tanstack/react-query";
export function useAIGenerate() {
  return useMutation({
    mutationFn: ({ prompt }: AIGenerateRequest) => generateAIContent(prompt),
  });
}

