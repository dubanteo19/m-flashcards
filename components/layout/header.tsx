"use client";
import { HeartIcon, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { ActionButton } from "../ui/action-button";
import { LinkButton } from "../ui/link-button";
import { ROUTES } from "@/app/lib/constants";

export default function Header() {
    return (
        <header className="container mx-auto py-4 px-4 flex gap-4 items-center justify-between sticky top-0 bg-background z-50">
            <div>
                <Link href={ROUTES.HOME} className="text-2xl font-bold text-primary">
                    <h1>M Flashcards</h1>
                </Link>
                <span className="text-sm text-muted-foreground">Small app to help you learn vocabulary</span>
            </div>
            <div className="flex justify-between items-center gap-4">
                <ActionButton label="History" variant="secondary" size="icon" href={ROUTES.HISTORY}>
                    <HistoryIcon />
                </ActionButton>
                <ActionButton label="Favorites" size="icon" variant={"outline"} href={ROUTES.FAVORITES}>
                    <HeartIcon />
                </ActionButton>
                <LinkButton href={ROUTES.DASHBOARD} variant="outline">Contribute </LinkButton>
            </div>
        </header>
    );
}