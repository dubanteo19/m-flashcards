"use client";

import { LanguageFilter } from "@/components/filter/language-filter";
import { CollectionFilters } from "@/app/lib/types";

interface Props {
    filters: CollectionFilters;
    onChange: (filters: Partial<CollectionFilters>) => void;
}

export function FilterBar({ filters, onChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <LanguageFilter
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