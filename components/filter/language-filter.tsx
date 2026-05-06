import { LanguageCode } from "@/app/lib/enums";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react"; // Fallback for 'All'
import { Flag } from "../flag-icon";

interface LanguageFilterProps {
    selected?: string;
    onSelect: (value: string) => void;
}

export function LanguageFilter({ selected, onSelect }: LanguageFilterProps) {
    // Get all enum values
    const languages = Object.values(LanguageCode);

    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {/* "All" Button */}
            <button
                onClick={() => onSelect("")}
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

            {/* Language Flag Buttons */}
            {languages.map((lang) => {
                const isActive = selected === lang;

                return (
                    <button
                        key={lang}
                        onClick={() => onSelect(lang)}
                        className={cn(
                            "p-1 rounded-md border-2 transition-all hover:scale-110",
                            isActive
                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                : "border-transparent opacity-50 hover:opacity-100"
                        )}
                    >
                        <Flag language={lang} size={24} />
                    </button>
                );
            })}
        </div>
    );
}