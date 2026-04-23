"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Info } from "lucide-react";

export default function PromptTemplate({ topic = "[Your Topic]" }: { topic?: string }) {
    const [copied, setCopied] = useState(false);

    const promptText = `Generate a JSON array of 15 Japanese vocabulary words about ${topic}. 
Each object must have these exact keys:
- "word": The Kanji or Kana (e.g., "勉強")
- "reading": The Furigana/Reading (e.g., "べんきょう")
- "meaning": The English translation (e.g., "To study")

Return ONLY the raw JSON array. Do not include any markdown formatting like \`\`\`json or introductory text.`;

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
                    AI Prompt Helper
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 gap-2 text-xs"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy Prompt"}
                </Button>
            </div>

            <div className="relative">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-background p-3 rounded border">
                    {promptText}
                </pre>
            </div>

            <p className="text-[10px] text-muted-foreground italic text-center">
                Tip: Paste this into ChatGPT or Gemini, then copy the result into the JSON tab.
            </p>
        </div>
    );
}