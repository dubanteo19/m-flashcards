// components/language-selector.tsx
import { LanguageCode } from "@/app/lib/enums";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { Flag } from "@/components/flag-icon";

interface LanguageSelectorProps {
    selected?: LanguageCode;
    onSelect: (value: LanguageCode) => void;
    showAll?: boolean;
}

export function LanguageSelector({ selected, onSelect, showAll = true }: LanguageSelectorProps) {
    const languages = Object.values(LanguageCode);

    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {/* Optional "All" Button */}
            {showAll && (
                <button
                    type="button"
                    onClick={() => onSelect(LanguageCode.English)}
                    className={cn(
                        "p-1 rounded-md border-2 transition-all hover:scale-110",
                        !selected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                    )}
                >
                    <div className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded-sm">
                        <Globe size={16} className="text-slate-600" />
                    </div>
                </button>
            )}

            {/* Language Flag Buttons */}
            {languages.map((lang) => {
                const isActive = selected === lang;

                return (
                    <button
                        key={lang}
                        type="button" // Important for forms
                        onClick={() => onSelect(lang)}
                        className={cn(
                            "p-1 rounded-md border-2 transition-all hover:scale-110",
                            isActive
                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                : "border-transparent opacity-50 hover:opacity-100"
                        )}
                    >
                        <Flag language={lang} />
                    </button>
                );
            })}
        </div>
    );
}