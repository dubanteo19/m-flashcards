"use client";

import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import FullPageLoader from "@/components/loader";
import { useCollectionBySlug } from "@/hooks/useColleciton";
import { useTranslations } from "next-intl";
import { use } from "react";

export default function EditCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const t = useTranslations("dashboard.form");
    const slug = resolvedParams.slug;
    const { data: initialData, isLoading } = useCollectionBySlug(slug)
    if (isLoading) return <FullPageLoader />

    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h3 >
                    {slug ? t("editTitle") : t("createTitle")}
                </h3>
                <p className="text-muted-foreground">
                    {slug ? `${t("editSubTitle")}: ${decodeURIComponent(slug)}` : t("subTitle")}
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