import { Collection } from "@/app/lib/types/cards";
import { db } from "@/app/lib/db";

export const favoritesService = {
    async toggleFavorite(collection: Collection) {
        const existing = await db.favorites.where('slug').equals(collection.slug).first();
        if (existing) {
            await db.favorites.delete(collection.slug);
            return false; // Unfavorited
        }
        // Check capacity before adding
        const count = await db.favorites.count();
        if (count >= 50) {
            throw new Error("Favorite limit reached (max 50)");
        }

        await db.favorites.add({ ...collection, isFavorited: true });
        return true; // Favorited
    },
};