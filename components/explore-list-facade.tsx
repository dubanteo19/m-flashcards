
"use client";
import { Collection } from "@/app/lib/types";
import { CollectionCard } from "@/components/collection-card";
import { db } from "@/lib/db";
import { favoritesService } from "@/services/favoriteService";
import { useLiveQuery } from "dexie-react-hooks";
import { motion } from "framer-motion";
import { useMemo } from "react";
interface ExploreListFacadeProps {
    collections: Collection[];
    hasFilters: boolean;
}
export const ExploreListFacade = ({ collections, hasFilters }: ExploreListFacadeProps) => {
    const favSlugs = useLiveQuery(
        async () => {
            const favs = await db.favorites.toArray();
            return new Set(favs.map(f => f.slug));
        },
        []
    );

    const enrichedCollections = useMemo(() => {
        return collections.map(col => ({
            ...col,
            isFavorited: favSlugs?.has(col.slug) ?? false
        }));
    }, [collections, favSlugs]);
    if (enrichedCollections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center ">
                <p className="text-lg font-medium">
                    {hasFilters
                        ? "No results match your filters"
                        : "No collections yet"}
                </p>

                <p className="text-sm text-muted-foreground mt-2">
                    {hasFilters
                        ? "Try adjusting or clearing your filters"
                        : "Come back later or refresh to fetch new data"}
                </p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
            {enrichedCollections?.map((collection) => (
                <motion.div
                    key={collection.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <CollectionCard onToggleFavorite={() => favoritesService.toggleFavorite(collection)} collection={collection} />
                </motion.div>
            ))}
        </div>
    );
};