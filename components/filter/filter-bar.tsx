"use client";

import { CollectionFilters } from "@/app/lib/types";
import { LanguageSelector } from "./language-selector";

interface Props {
    filters: CollectionFilters;
    onChange: (filters: Partial<CollectionFilters>) => void;
}

export function FilterBar({ filters, onChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <LanguageSelector
                selected={filters.language}
                onSelect={(val) =>
                    onChange({
                        language: val === filters.language ? undefined : val,
                    })
                }
            />
        </div>
    );
}