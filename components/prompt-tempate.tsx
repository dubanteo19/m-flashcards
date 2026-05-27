"use client";
import { LanguageCode } from "@/app/lib/enums";
import { cn } from "@/app/lib/utils";
import AIButtons from "@/components/buttons/ai-buttons";
import { Button } from "@/components/ui/button";
import { Check, Copy, Info } from "lucide-react";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

interface PromptTemplateProps {
  sourceText?: string;
  lang?: LanguageCode;
  wordCount?: number;
  onPromptChange: (prompt: string) => void;
}

export default function PromptTemplate({
  sourceText = "You source text:",
  lang = LanguageCode.English,
  wordCount = 15,
  onPromptChange,
}: PromptTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const t = useTranslations("dashboard.form.promptTemplate");
  const locale = useLocale();
  const getLanguageName = (code: LanguageCode): string => {
    const names: Record<LanguageCode, string> = {
      [LanguageCode.English]: "English",
      [LanguageCode.Japanese]: "Japanese",
      [LanguageCode.Chinese]: "Chinese",
      [LanguageCode.Korean]: "Korean",
    };
    return names[code] || "English";
  };

  const languageName = getLanguageName(lang);
  // Updated template to use the dynamic languageName
  const promptText = useMemo(
    () => buildPrompt(sourceText, languageName, locale, wordCount),
    [sourceText, languageName, locale, wordCount],
  );

  useEffect(() => {
    onPromptChange(promptText);
  }, [promptText, onPromptChange]);

  const handleCopy = () => {
    setHasCopied(true);
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Info size={16} />
          {t("title")} ({languageName}) |
        </div>
        <div className="flex items-center gap-2">
          <Button
            name="copy-prompt"
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleCopy}
            className={cn(
              "h-8 gap-2 text-xs",
              !hasCopied && "animate-pulse-outward",
            )}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? t("copied") : t("copy")}
          </Button>
          {hasCopied && <AIButtons name="ai-tools" />}
        </div>
      </div>

      <div className="relative">
        <p className="text-xs break-all text-muted-foreground whitespace-pre-wrap  leading-relaxed bg-background p-3 rounded border">
          {promptText}
        </p>
      </div>

      <p className="text-[10px] text-muted-foreground italic text-center">
        {t("tips")}
      </p>
    </div>
  );
}

export function buildPrompt(
  sourceText: string,
  languageName: string,
  locale: Locale = "en",
  wordCount: number = 15,
) {
  const isLongContent = sourceText.trim().length > 120;
  const languageModifier = languageName === "Chinese" ? " (giản thể)" : "";
  const templates: Record<Locale, { topic: string; content: string }> = {
    en: {
      topic: `Generate a JSON array of maximum ${wordCount} ${languageName}  vocabulary words about "${sourceText}".

Each object must have these exact keys:
- "word": The word or phrase in ${languageName} script
- "reading": The phonetic pronunciation or romanization
- "meaning": The English translation

Focus on useful and common vocabulary.

Return ONLY the raw JSON array.`,

      content: `Analyze the following text and extract maximum ${wordCount} important or meaningful ${languageName} words or phrases.

Focus on:
- key vocabulary
- meaningful expressions
- useful phrases
- important terms from the text

Text:
"""
${sourceText}
"""

Each object must have these exact keys:
- "word": The extracted word or phrase in ${languageName}
- "reading": The phonetic pronunciation or romanization
- "meaning": The English translation

Return ONLY the raw JSON array.`,
    },

    vi: {
      topic: `Tạo một mảng JSON gồm tối đa ${wordCount} từ vựng ${languageName} ${languageModifier} về chủ đề "${sourceText}".

Mỗi object phải có chính xác các key sau:
- "word": Từ hoặc cụm từ bằng ${languageName}
- "reading": Phiên âm hoặc romanization
- "meaning": Nghĩa tiếng Việt

Ưu tiên các từ vựng phổ biến và hữu ích.

Chỉ trả về mảng JSON thô.`,

      content: `Phân tích đoạn văn dưới đây và trích xuất tối đa ${wordCount} từ hoặc cụm từ ${languageName} (giản thể) quan trọng và có ý nghĩa.

Ưu tiên:
- từ vựng quan trọng
- cụm từ hữu ích
- biểu đạt thường dùng
- thuật ngữ nổi bật trong nội dung

Nội dung:
"""
${sourceText}
"""

Mỗi object phải có chính xác các key sau:
- "word": Từ hoặc cụm từ bằng ${languageName}
- "reading": Phiên âm hoặc romanization
- "meaning": Nghĩa tiếng Việt

Chỉ trả về mảng JSON thô.`,
    },
  };

  const selected = templates[locale] || templates.en;

  return isLongContent ? selected.content : selected.topic;
}
