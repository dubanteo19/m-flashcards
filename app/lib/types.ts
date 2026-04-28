export interface Card {
    id: string; // UUID from Supabase
    collection_id: string; // Foreign key
    word: string; // The Kanji/Kana (e.g., 開発)
    reading: string; // The Furigana/Reading (e.g., かいはつ)
    meaning: string; // The English translation (e.g., Development)
    order_index: number; // For keeping cards in sequence
    created_at?: string;
}

export interface RawCollectionResponse {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    author_username: string;
    is_published: boolean;
    created_at: string;
    cards: { count: number }[]; // Supabase returns an array of objects for counts
}
export interface Collection {
    id: string; // Friendly Slug (e.g., "it-vocab-123")
    title: string;
    description: string | null;
    author_username: string;
    slug?: string;
    is_published: boolean;
    created_at: string;
    cards_count?: number;
    cards?: Card[];
}
// The exact shape Supabase returns for .select("*, cards(count)")

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