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
    language: raw.language,
    // Extract the number safely
    cards_count: raw.cards?.[0]?.count ?? 0,
    // Explicitly set to undefined since this specific query only returns the count
    cards: undefined
  };
}
export const shuffleArray = <T>(array: T[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export function formatDate(date: number | Date | undefined) {
  const now = new Date();
  const then = date ? new Date(date) : now;
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return then.toLocaleDateString();
}