"use client";
import { CollectionCard } from "@/components/collection-card";
import { EmptyState } from "@/components/empty-state";
import Loader from "@/components/loader";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Clock, Inbox } from "lucide-react";
export default function HistoryPage() {
    return (
        <main className="container mx-auto py-10 px-4 max-w-6xl">
            <header className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-primary/10 rounded-xl">
                    <Clock className="text-primary h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Learning History</h1>
                    <p className="text-muted-foreground">Pick up where you left off</p>
                </div>
            </header>

            <HistoryListFacade />
        </main>
    );
}


function HistoryListFacade() {
    const history = useLiveQuery(() =>
        db.history.orderBy('lastViewed').reverse().toArray()
    );

    // 1. Loading State
    if (!history) {
        return <Loader />;
    }

    // 2. Empty State
    if (history.length === 0) {
        return (
            <EmptyState
                title="No history yet."
                description="Collections you study will appear here."
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