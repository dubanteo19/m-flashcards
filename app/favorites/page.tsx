"use client";
import { CollectionCard } from "@/components/collection-card";
import { EmptyState } from "@/components/empty-state";
import Loader from "@/components/loader";
import { db } from "@/lib/db";
import { favoritesService } from "@/services/favoriteService";
import { useLiveQuery } from "dexie-react-hooks";
export default function FavoritesPage() {
    return (
        <main className="container mx-auto py-10 px-4 max-w-6xl">
            <header className="flex items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Favorite Collections</h1>
                    <p className="text-muted-foreground">Collections you've marked as favorites</p>
                </div>
            </header>
            <FavoritesListFacade />
        </main>
    );
}


function FavoritesListFacade() {
    const favorites = useLiveQuery(() =>
        db.favorites.toArray()
    );

    // 1. Loading State
    if (!favorites) {
        return <Loader />;
    }

    // 2. Empty State
    if (favorites.length === 0) {
        return (
            <EmptyState
                title="No favorite collections yet."
                description="Collections you mark as favorites will appear here."
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