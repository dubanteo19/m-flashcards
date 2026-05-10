"use client";

import { LanguageCode } from "@/app/lib/enums";
import { CollectionFilters } from "@/app/lib/types";
import { FilterBar } from "@/components/filter/filter-bar";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/hooks/useColleciton";
import { useCooldown } from "@/hooks/useCooldown";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { ExploreListFacade } from "./explore-list-facade";

export default function HomePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations("common");
    const filters: CollectionFilters = {
        language: searchParams.get("language") as LanguageCode || undefined,
        author: searchParams.get("author") || undefined,
    };

    const { data: collections, isLoading, refetch, isFetching } = useCollections(filters);
    const { cooldown, trigger } = useCooldown(4000)
    const updateFilter = (newFilters: Partial<CollectionFilters>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value as string);
            else params.delete(key);
        });
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const handleRefresh = async () => {
        if (!trigger() || isFetching) return;
        await refetch();
    };

    if (isLoading || !collections) return <Loader />;
    const hasFilters = Object.values(filters).some(Boolean);
    return (
        <div className="space-y-4 ">
            <div className="flex items-end justify-between gap-4">
                <FilterBar filters={filters} onChange={updateFilter} />
                <Button
                    variant="outline"
                    size="sm"
                    disabled={isFetching || cooldown}
                    onClick={handleRefresh}
                >
                    {isFetching ? "..." : t("refresh")}
                </Button>
            </div>
            <ExploreListFacade
                collections={collections}
                hasFilters={hasFilters}
            />
        </div>
    );
}