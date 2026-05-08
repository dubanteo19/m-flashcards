import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export function useStats() {
    const favoritesCount = useLiveQuery(() => db.favorites.count()) ?? 0;
    return {
        favoritesCount,
    };
}