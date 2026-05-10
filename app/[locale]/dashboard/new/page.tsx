"use client";

import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import { useAuth } from "@/context/AuthContext";

export default function NewCollectionPage() {
    const { username } = useAuth();
    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h2>
                    Create New Collection
                </h2>
                <p className="text-muted-foreground text-lg">
                    Set up your new flashcard deck as <span className="font-semibold text-primary">{username}</span>
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <CollectionForm />
            </div>
        </div>
    );
}