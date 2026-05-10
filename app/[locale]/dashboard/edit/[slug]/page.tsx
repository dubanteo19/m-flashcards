"use client";

import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import Loader from "@/components/loader";
import { useCollectionBySlug } from "@/hooks/useColleciton";
import { use } from "react";

export default function EditCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const { data: initialData, isLoading } = useCollectionBySlug(slug)
    if (isLoading) return <Loader />

    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h2 >
                    {slug ? "Edit Collection" : "Create New Collection"}
                </h2>
                <p className="text-muted-foreground">
                    {slug ? `Updating Collection: ${decodeURIComponent(slug)}` : "Set up your new flashcard deck"}
                </p>
            </div>
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <CollectionForm
                    initialData={initialData || undefined}
                />
            </div>
        </div>
    );
}