"use client";

import { ROUTES } from "@/app/lib/constants";
import { Badge } from "@/components/ui/badge";
import { useStats } from "@/hooks/use-stats";
import { HeartIcon, HistoryIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AppLanguageSelector } from "../app-language-selector";
import { ActionButton } from "../ui/action-button";

export default function Header() {
    const { favoritesCount } = useStats();
    const t = useTranslations("header");

    return (
        <header className="container mx-auto py-4 px-4 flex  gap-4 items-center justify-between sticky  top-0 bg-background z-50">
            <div>
                <Link href={ROUTES.HOME} className="text-primary ">
                    <h1 className="font-bold text-xl">M Flashcard</h1>
                </Link>
                <p className="hidden md:block text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>

            <div className="flex justify-between items-center gap-1 md:gap-4">
                {/* History Action */}
                <ActionButton label={t("history")} variant="secondary" size="icon" href={ROUTES.HISTORY}>
                    <HistoryIcon className="size-5" />
                </ActionButton>
                {/* Favorites Action */}
                <ActionButton label={t("favorites")} size="icon" variant="outline" href={ROUTES.FAVORITES}>
                    <div className="relative">
                        <HeartIcon className="h-5 w-5" />
                        {favoritesCount > 0 && (
                            <Badge
                                className="absolute -top-4 -right-4 size-5 justify-center rounded-full p-0 text-10px "
                            >
                                {favoritesCount}
                            </Badge>
                        )}
                    </div>
                </ActionButton>
                <AppLanguageSelector />
            </div>
        </header>
    );
}