import { LanguageCode } from "@/app/lib/enums";
import { Button } from "@/components/ui/button"; // Adjust based on your path
import { Check, Copy, Info } from "lucide-react";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";


interface PromptTemplateProps {
    topic?: string;
    lang?: LanguageCode;
}

export default function PromptTemplate({
    topic = "[Your Topic]",
    lang = LanguageCode.English
}: PromptTemplateProps) {
    const [copied, setCopied] = useState(false);
    const t = useTranslations("dashboard.form.promptTemplate");
    const locale = useLocale();
    const getLanguageName = (code: LanguageCode): string => {
        const names: Record<LanguageCode, string> = {
            [LanguageCode.English]: "English",
            [LanguageCode.Japanese]: "Japanese",
            [LanguageCode.Chinese]: "Chinese",
            [LanguageCode.Korean]: "Korean"
        };
        return names[code] || "English";
    };

    const languageName = getLanguageName(lang);

    // Updated template to use the dynamic languageName
    const promptText = useMemo(() => buildPrompt(topic, languageName, locale), [topic, languageName, locale]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Info size={16} />
                    {t("title")} ({languageName})
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 gap-2 text-xs"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? t("copied") : t("copy")}
                </Button>
            </div>

            <div className="relative">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-background p-3 rounded border">
                    {promptText}
                </pre>
            </div>

            <p className="text-[10px] text-muted-foreground italic text-center">
                {t("tips")}
            </p>
        </div>
    );
}

function buildPrompt(
    topic: string,
    languageName: string,
    locale: Locale = "en"
) {
    const templates: Record<Locale, string> = {
        en: `Generate a JSON array of 15 ${languageName} vocabulary words about ${topic}.

Each object must have these exact keys:
- "word": The word in ${languageName} script
- "reading": The phonetic pronunciation or romanization
- "meaning": The English translation

Return ONLY the raw JSON array. Do not include any markdown formatting like \`\`\`json or introductory text.`,

        vi: `Tạo một mảng JSON gồm 15 từ vựng ${languageName} về chủ đề ${topic}.

Mỗi object phải có chính xác các key sau:
- "word": Từ vựng bằng chữ ${languageName}
- "reading": Phiên âm hoặc romanization
- "meaning": Nghĩa tiếng Anh

Chỉ trả về mảng JSON thô. Không thêm markdown như \`\`\`json hoặc bất kỳ phần giới thiệu nào.`
    };

    return templates[locale] || templates.en;
}

