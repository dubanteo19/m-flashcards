"use client";

import { supabase } from "@/app/lib/supabase";
import { Collection } from "@/app/lib/types";
import CollectionForm from "@/components/collection-form";
import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditCollectionPage({ params }: { params: Promise<{ path?: string[] }> }) {
    const resolvedParams = use(params);
    const path = resolvedParams.path || [];
    const collectionId = path[0];

    const router = useRouter();
    const [initialData, setInitialData] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(!!collectionId);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("jp_username");
        if (!saved) return router.push("/login");
        const initialize = () => {
            setUsername(saved);
            setLoading(false);
        };
        initialize();

        if (collectionId) {
            const fetchDetail = async () => {
                const { data } = await supabase
                    .from("collections")
                    .select("*, cards(*)")
                    .eq("id", collectionId)
                    .single();

                if (data) setInitialData(data);
                const initialize = () => {
                    setInitialData(data);
                    setLoading(false);
                };
                initialize();
            };
            fetchDetail();
        }
    }, [collectionId, router]);

    if (loading) return <Loader />

    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ChevronLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {collectionId ? "Edit Collection" : "Create New Collection"}
                </h1>
                <p className="text-muted-foreground">
                    {collectionId ? `Updating ID: ${collectionId}` : "Set up your new flashcard deck"}
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