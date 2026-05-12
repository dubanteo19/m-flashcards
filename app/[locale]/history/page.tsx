"use client";
import { CollectionCard } from "@/components/collection-card";
import { EmptyState } from "@/components/empty-state";
import FullPageLoader from "@/components/loader";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
export default function HistoryPage() {
    const t = useTranslations("history");   
    return (
        <main className="container mx-auto py-10 px-4 max-w-6xl">
            <header className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-primary/10 rounded-xl">
                    <Clock className="text-primary h-6 w-6" />
                </div>
                <div>
                    <h2>{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
            </header>

            <HistoryListFacade />
        </main>
    );
}


function HistoryListFacade() {
    const t = useTranslations("history");
    const history = useLiveQuery(() =>
        db.history.orderBy('lastViewed').reverse().toArray()
    );

    // 1. Loading State
    if (!history) {
        return <FullPageLoader />;
    }

    // 2. Empty State
    if (history.length === 0) {
        return (
            <EmptyState
                title={t("empty.noHistory")}
                description={t("empty.startLearning")}
            />
        );
    }

    // 3. Success State
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
                <CollectionCard
                    variant="history"
                    key={item.slug}
                    collection={item}
                />
            ))}
        </div>
    );
}