"use client";

import { Collection } from "@/app/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock, HeartIcon, User } from "lucide-react";
import Link from "next/link";
import { Flag } from "./flag-icon";
import { ActionButton } from "./ui/action-button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LinkButton } from "./ui/link-button";
import { ROUTES } from "@/app/lib/constants";

type CardVariant = "explore" | "history";

interface CollectionCardProps {
    collection: Collection;
    variant?: CardVariant;
    onToggleFavorite?: () => void;
}

export const CollectionCard = ({ collection, variant = "explore", onToggleFavorite }: CollectionCardProps) => {
    const isHistory = variant === "history";
    const isFavorited = !!collection.isFavorited;
    const Metadata = (
        <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1 font-medium">
                <User size={14} className="text-primary" />
                {collection.author_username}
            </span>
            <Flag language={collection.language} />
            <span className="flex items-center gap-1">
                <BookOpen size={14} /> {collection.cards_count || 0}
            </span>
        </div>
    );

    const renderActions = () => {
        if (isHistory) {
            return (
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(collection.lastViewed)}</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2">
                <ActionButton
                    onClick={onToggleFavorite}
                    label="Favorite"
                    size="icon"
                    variant="link"
                    className={cn(
                        "transition-colors duration-300",
                        isFavorited ? "text-red-500" : "text-muted-foreground hover:text-red-400"
                    )}
                >
                    <motion.div
                        key={String(isFavorited)}
                        animate={isFavorited ? { scale: [1, 1.4, 1] } : {}}
                        whileTap={{ scale: 0.8 }}
                    >
                        <HeartIcon size={20} className={cn(isFavorited && "fill-current")} />
                    </motion.div>
                </ActionButton>
                <LinkButton href={ROUTES.LEARN(collection.slug)}>Learn</LinkButton>
            </div>
        );
    };
    {/*main render*/ }
    return (
        <Card className={cn(
            "group relative h-full border-2 transition-all flex flex-col cursor-pointer",
            isHistory
                ? "bg-slate-50/50 border-slate-200 shadow-none"
                : "bg-white border-transparent hover:border-primary shadow-sm"
        )}>
            <Link className="absolute inset-0 z-0" href={ROUTES.LEARN(collection.slug)} />
            <CardHeader className="flex-1">
                <CardTitle className={cn(
                    "text-xl transition-colors",
                    isHistory ? "text-slate-600" : "group-hover:text-primary"
                )}>
                    {collection.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                    {collection.description}
                </CardDescription>
            </CardHeader>

            <CardFooter className={cn(
                "flex justify-between items-center z-10 text-sm pt-4 border-t",
                isHistory ? "bg-slate-100/30" : "bg-muted/20"
            )}>
                {Metadata}
                {renderActions()}
            </CardFooter>
        </Card>
    );
};