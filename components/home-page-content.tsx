"use client";

import { CollectionFilters } from "@/app/lib/types";
import { FilterBar } from "@/components/filter/filter-bar";
import Loader from "@/components/loader";
import { useCollections } from "@/hooks/useColleciton";
import { useRouter, useSearchParams } from "next/navigation";
import { CooldownButton } from "./buttons/cooldown-button";
import { ExploreListFacade } from "./explore-list-facade";
import FullPageLoader from "@/components/loader";
import { useTranslations } from "next-intl";
import { LanguageCode } from "@/app/lib/enums";

export default function HomePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations("common");
    const filters: CollectionFilters = {
        language: searchParams.get("language") as LanguageCode || undefined,
        author: searchParams.get("author") || undefined,
    };

    const { data: collections, isLoading, refetch, isFetching } = useCollections(filters);
    const updateFilter = (newFilters: Partial<CollectionFilters>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value as string);
            else params.delete(key);
        });
        router.replace(`?${params.toString()}`, { scroll: false });
    };


    if (isLoading || !collections) return <FullPageLoader />;
    const hasFilters = Object.values(filters).some(Boolean);
    return (
        <div className="space-y-4 ">
            <div className="flex items-end justify-between gap-4">
                <FilterBar filters={filters} onChange={updateFilter} />
                <CooldownButton
                    isFetching={isFetching}
                    callback={refetch}
                    text="Refresh"
                />
            </div>
            <ExploreListFacade
                collections={collections}
                hasFilters={hasFilters}
            />
        </div>
    );
}