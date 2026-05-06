import { Collection } from "@/app/lib/types";
import { db } from "@/lib/db";

export const historyService = {
    async addToHistory(collection: Collection) {
        // 1. Upsert: If exists, update time. If not, add.
        const existing = await db.history.where('slug').equals(collection.slug).first();

        if (existing) {
            await db.history.update(existing.id!, { lastViewed: Date.now() });
        } else {
            await db.history.add({
                ...collection,
                cards_count: collection.cards?.length || 0,
                cards: undefined, // Don't store cards in history to save space
                lastViewed: Date.now()
            });
        }
        // 2. Enforce Capacity: Keep only the 20 most recent
        const count = await db.history.count();
        if (count > 20) {
            const oldestItems = await db.history
                .orderBy('lastViewed')
                .limit(count - 20)
                .toArray();

            const idsToDelete = oldestItems.map(item => item.id!);
            await db.history.bulkDelete(idsToDelete);
        }
    }
};