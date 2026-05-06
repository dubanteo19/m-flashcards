import { Collection } from "@/app/lib/types";
import { db } from "@/lib/db";

export const favoritesService = {
    async toggleFavorite(collection: Collection) {
        const existing = await db.favorites.where('slug').equals(collection.slug).first();
        if (existing) {
            await db.favorites.delete(collection.slug);
            return false; // Unfavorited
        } else {
            await db.favorites.add({ ...collection, isFavorited: true });
            return true; // Favorited
        }
    },
};