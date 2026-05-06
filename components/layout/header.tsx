"use client";
import { HeartIcon, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { ActionButton } from "../ui/action-button";
import { LinkButton } from "../ui/link-button";

export default function Header() {
    return (
        <header className="container mx-auto py-4 px-4 flex gap-4 items-center justify-between">
            <div>
                <Link href="/" className="text-2xl font-bold text-primary">
                    <h1>M Flashcards</h1>
                </Link>
                <span className="text-sm text-muted-foreground">Small app to help you learn vocabulary</span>
            </div>
            <div className="flex justify-between items-center gap-4">
                <ActionButton label="History" variant="secondary" size="icon" href="/history">
                    <HistoryIcon />
                </ActionButton>
                <ActionButton className="text-red-500" label="Favorites" variant="default" size="icon" href="/favorites">
                    <HeartIcon className="fill-current" />
                </ActionButton>
                <LinkButton href="/dashboard" variant="outline">Contribute </LinkButton>
            </div>
        </header>
    );
}