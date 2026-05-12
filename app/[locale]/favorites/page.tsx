"use client";
import { CollectionCard } from "@/components/collection-card";
import { EmptyState } from "@/components/empty-state";
import FullPageLoader from "@/components/loader";
import { db } from "@/lib/db";
import { favoritesService } from "@/services/favoriteService";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslations } from "next-intl";
export default function FavoritesPage() {
    const t = useTranslations("favorites");
    return (
        <main className="container mx-auto py-2 px-4 max-w-6xl">
            <header className="flex items-center gap-4 mb-10">
                <div>
                    <h2>{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
            </header>
            <FavoritesListFacade />
        </main>
    );
}


function FavoritesListFacade() {
    const t = useTranslations("favorites");
    const favorites = useLiveQuery(() =>
        db.favorites.toArray()
    );

    // 1. Loading State
    if (!favorites) {
        return <FullPageLoader />;
    }

    // 2. Empty State
    if (favorites.length === 0) {
        return (
            <EmptyState
                title={t("empty.noFavorites")}
                description={t("empty.addFavorites")}
            />
        );
    }

    // 3. Success State
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
                <CollectionCard
                    variant="explore"
                    key={item.slug}
                    collection={item}
                    onToggleFavorite={() => favoritesService.toggleFavorite(item)}
                />
            ))}
        </div>
    );
}