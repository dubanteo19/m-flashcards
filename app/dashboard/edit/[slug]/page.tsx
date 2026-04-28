"use client";

import { Collection } from "@/app/lib/types";
import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import Loader from "@/components/loader";
import { collectionService } from "@/services/collectionService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const router = useRouter();
    const [initialData, setInitialData] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(!!slug);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("username");
        if (!saved) return router.push("/login");
        console.log(slug);
        if (slug) {
            const fetchDetail = async () => {
                const collection = await collectionService.getCollectionBySlug(slug);
                console.log(collection);
                if (collection) {
                    setInitialData(collection);
                    setLoading(false);
                    setUsername(saved);
                }
            };
            fetchDetail();
        }
    }, [slug, router]);

    if (loading) return <Loader />

    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {slug ? "Edit Collection" : "Create New Collection"}
                </h1>
                <p className="text-muted-foreground">
                    {slug ? `Updating Collection: ${decodeURIComponent(slug)}` : "Set up your new flashcard deck"}
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <CollectionForm
                    username={username}
                    initialData={initialData || undefined}
                    onSuccess={() => router.push("/dashboard")}
                />
            </div>
        </div>
    );
}