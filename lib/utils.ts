import { Collection, RawCollectionResponse } from "@/app/lib/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toCollection(raw: RawCollectionResponse): Collection {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    author_username: raw.author_username,
    slug: raw.slug,
    is_published: raw.is_published,
    created_at: raw.created_at,
    // Extract the number safely
    cards_count: raw.cards?.[0]?.count ?? 0,
    // Explicitly set to undefined since this specific query only returns the count
    cards: undefined
  };
}