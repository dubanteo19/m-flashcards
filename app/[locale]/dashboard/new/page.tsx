"use client";

import { ROUTES } from "@/app/lib/constants";
import BackButton from "@/components/back-button";
import CollectionForm from "@/components/collection-form";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NewCollectionPage() {
    const router = useRouter();
    const { username } = useAuth();
    const t = useTranslations("dashboard.form")
    return (
        <div className="container mx-auto py-10 max-w-3xl px-4">
            <BackButton />
            <div className="mb-8">
                <h3>
                    {t("createTitle")}
                </h3>
                <p className="text-muted-foreground text-lg">
                    {t("subTitle")} <span className="font-semibold text-primary">{username}</span>
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <CollectionForm onSuccess={() => {
                    router.push(ROUTES.DASHBOARD);
                }} />
            </div>
        </div>
    );
}