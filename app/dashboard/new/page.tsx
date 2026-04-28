"use client";

import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewCollectionPage() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");

        if (!savedUsername) {
            router.push("/login");
            return;
        }

        const initialize = () => {
            setUsername(savedUsername);
            setLoading(false);
        };

        initialize();
    }, [router]);

    if (loading || !username) {
        return <Loader />
    }

    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Create New Collection
                </h1>
                <p className="text-muted-foreground text-lg">
                    Set up your new flashcard deck as <span className="font-semibold text-primary">{username}</span>
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <CollectionForm
                    username={username}
                    onSuccess={() => router.push("/dashboard")}
                />
            </div>
        </div>
    );
}