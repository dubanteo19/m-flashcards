import { LanguageCode } from "./enums";

export interface Card {
    id: string; // UUID from Supabase
    collection_id: string; // Foreign key
    word: string; // The Kanji/Kana (e.g., 開発)
    reading: string; // The Furigana/Reading (e.g., かいはつ)
    meaning: string; // The English translation (e.g., Development)
    order_index: number; // For keeping cards in sequence
    created_at?: string;
}

// The source of truth for the core data
export interface CollectionBase {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    author_username: string;
    is_published: boolean;
    created_at: string;
    language: LanguageCode;
}

// Exactly what comes from the Supabase query
export interface RawCollectionResponse extends CollectionBase {
    cards: { count: number }[];
}

// What your UI/View actually uses
export interface Collection extends CollectionBase {
    cards_count: number;
    isFavorited?: boolean; // Optional, can be set on the client side
    lastViewed?: number; // Optional, for history tracking
    cards?: Card[];
}
export interface CollectionFilters {
    language?: string;
    author?: string;
    searchTerm?: string;
}
export interface FlashcardView {
    word: string;
    reading: string;
    meaning: string;
}

export interface FlashcardImportInput {
    word: string;
    reading: string;
    meaning: string;
}
