export interface Card {
    id: string; // UUID from Supabase
    collection_id: string; // Foreign key
    word: string; // The Kanji/Kana (e.g., 開発)
    reading: string; // The Furigana/Reading (e.g., かいはつ)
    meaning: string; // The English translation (e.g., Development)
    order_index: number; // For keeping cards in sequence
    created_at?: string;
}
export interface Collection {
    id: string; // Friendly Slug (e.g., "it-vocab-123")
    title: string;
    description: string | null;
    author_username: string;
    is_published: boolean;
    created_at: string;
    cards?: Card[];
    cards_count?: [{ count: number }];
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