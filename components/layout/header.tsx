"use client";

import { ROUTES } from "@/app/lib/constants";
import { Badge } from "@/components/ui/badge"; // Ensure this path matches your shadcn setup
import { useStats } from "@/hooks/use-stats";
import { HeartIcon, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { ActionButton } from "../ui/action-button";
import { LinkButton } from "../ui/link-button";

export default function Header() {
    const { favoritesCount } = useStats();
    return (
        <header className="container mx-auto py-4 px-4 flex gap-4 items-center justify-between sticky top-0 bg-background z-50">
            <div>
                <Link href={ROUTES.HOME} className="text-primary ">
                    <h1 className="font-bold text-xl">M Flashcards</h1>
                </Link>
                <p className="text-sm text-muted-foreground">Small app to help you learn vocabulary</p>
            </div>

            <div className="flex justify-between items-center gap-4">
                {/* History Action */}
                <ActionButton label="History" variant="secondary" size="icon" href={ROUTES.HISTORY}>
                    <HistoryIcon className="size-5" />
                </ActionButton>
                {/* Favorites Action */}
                <ActionButton label="Favorites" size="icon" variant="outline" href={ROUTES.FAVORITES}>
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

                <LinkButton href={ROUTES.DASHBOARD} variant="outline">
                    Contribute
                </LinkButton>
            </div>
        </header>
    );
}