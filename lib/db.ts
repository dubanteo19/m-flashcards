import { Collection } from '@/app/lib/types';
import Dexie, { type EntityTable } from 'dexie';


interface HistoryEntry extends Collection {
    lastViewed: number;
}

const db = new Dexie('UserActivityDB') as Dexie & {
    favorites: EntityTable<Collection, 'slug'>;
    history: EntityTable<HistoryEntry, 'slug'>;
};

// We index 'slug' for favorites to check duplicates quickly
// We index 'lastViewed' for history to sort by recency
db.version(1).stores({
    favorites: '&slug',
    history: '&slug, lastViewed'
});

export { db };