"use client";

import { ROUTES } from "@/app/lib/constants";
import { CooldownButton } from "@/components/buttons/cooldown-button";
import { Flag } from "@/components/flag-icon";
import FullPageLoader, { InlineLoader } from "@/components/loader";
import { ActionButton } from "@/components/ui/action-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useDeleteCollection, useUserCollections } from "@/hooks/useColleciton";
import { BookOpen, LogOut, Pencil, Plus, Trash } from "lucide-react"
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Dashboard() {
    const { username, logout } = useAuth();
    const t = useTranslations();
    const { data: collections = [], isLoading, refetch, isFetching } = useUserCollections(username ?? "");
    const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);
    const { mutate: deleteCollection, isPending: isDeleting } = useDeleteCollection();
    const confirmDelete = async () => {
        if (!collectionToDelete) return
        try {
            deleteCollection(collectionToDelete);
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setCollectionToDelete(null);
        }
    };
    if (isLoading) {
        return <FullPageLoader />
    }
    return (
        <div className=" container mx-auto py-10 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3>{t("dashboard.collections")}</h3>
                    <p className="text-muted-foreground text-lg">Logged in as {username}</p>
                </div>
                <div className="flex gap-3">
                    <CooldownButton
                        isFetching={isFetching}
                        callback={refetch}
                        text={t("common.refresh")}
                    />
                    <LinkButton href={ROUTES.DASHBOARD_NEW}><Plus size={18} />{t("dashboard.createCollection")}</LinkButton>
                    <ActionButton label={t("dashboard.logout")} variant="outline" onClick={logout}><LogOut size={16} /></ActionButton>
                </div>
            </div>

            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>{t("dashboard.table.name")}</TableHead>
                            <TableHead>{t("dashboard.table.status")}</TableHead>
                            <TableHead>{t("dashboard.table.cards")}</TableHead>
                            <TableHead>{t("dashboard.table.language")}</TableHead>
                            <TableHead className="text-right">{t("dashboard.table.actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center"><InlineLoader /></TableCell>
                            </TableRow>
                        ) : collections.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">No decks yet.</TableCell>
                            </TableRow>
                        ) : (
                            collections.map((collection) => (
                                <TableRow key={collection.id}>
                                    <TableCell className="font-semibold">{collection.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={collection.is_published ? "default" : "secondary"}>
                                            {collection.is_published ? t("common.public") : t("common.private")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{collection.cards_count} {t("dashboard.table.cards")}</TableCell>
                                    <TableCell>
                                        <div>
                                            <Flag language={collection.language} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ActionButton label={t("common.edit")} variant="outline" size="sm" href={ROUTES.DASHBOARD_EDIT(collection.slug)}>
                                            <Pencil size={14} />
                                        </ActionButton>
                                        <ActionButton label={t("common.delete")} variant="destructive" size="sm" onClick={() => setCollectionToDelete(collection.slug || null)}>
                                            <Trash size={14} />
                                        </ActionButton>
                                        <ActionButton size="sm" label={t("common.learn")} href={ROUTES.LEARN(collection.slug)}>
                                            <BookOpen size={14} />
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* THE CONFIRMATION DIALOG */}
            <AlertDialog open={!!collectionToDelete} onOpenChange={(open) => !open && setCollectionToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("dashboard.dialog.deleteTitle")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("dashboard.dialog.deleteMessage")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>{t("dashboard.dialog.cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isDeleting}
                        >
                            {isDeleting && <InlineLoader />}
                            {t("dashboard.dialog.confirm")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
}