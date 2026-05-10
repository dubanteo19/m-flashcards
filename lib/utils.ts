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

export function formatDate(
  date: number | Date | undefined,
  locale: string = "vi"
) {
  const now = new Date();
  const then = date ? new Date(date) : now;

  const diffInSeconds = Math.floor(
    (then.getTime() - now.getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, "second");
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, "minute");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, "hour");
  }

  const diffInDays = Math.floor(diffInHours / 24);

  return rtf.format(diffInDays, "day");
}