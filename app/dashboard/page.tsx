"use client";

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
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { collectionService } from "@/services/collectionService";
import { BookOpen, Loader2, LogOut, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Collection } from "../lib/types";
import Loader from "@/components/loader";
export default function Dashboard() {
    const [username, setUsername] = useState<string | null>(null);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (!savedUsername) {
            router.push("/login");
            return;
        }
        const initDashboard = async () => {
            try {
                const collections = await collectionService.getByUsername(savedUsername);
                setUsername(savedUsername);
                setCollections(collections);
            } catch (err) {
                console.error("Dashboard init error:", err);
            } finally {
                setLoading(false);
            }
        };

        initDashboard();
    }, [router]);
    // Updated Delete Logic
    const confirmDelete = async () => {
        if (!collectionToDelete) return;

        setIsDeleting(true);
        try {
            await collectionService.deleteCollection(collectionToDelete);
            setCollections(prev => prev.filter((c) => c.slug !== collectionToDelete));
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setIsDeleting(false);
            setCollectionToDelete(null);
        }
    };
    if (loading && !username) {
        return <Loader />
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>
                    <p className="text-muted-foreground text-lg">Logged in as {username}</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/new">
                        <Button className="gap-2"><Plus size={18} /> New Collection</Button>
                    </Link>
                    <Button variant="outline" onClick={() => {
                        localStorage.removeItem("username");
                        router.push("/login");
                    }}><LogOut size={16} /></Button>
                </div>
            </div>

            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Collection</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Cards</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="animate-spin inline" /></TableCell></TableRow>
                        ) : collections.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="h-32 text-center text-muted-foreground">No decks yet.</TableCell></TableRow>
                        ) : (
                            collections.map((collection) => (
                                <TableRow key={collection.id}>
                                    <TableCell className="font-semibold">{collection.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={collection.is_published ? "default" : "secondary"}>
                                            {collection.is_published ? "Public" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{collection.cards_count} cards</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/dashboard/edit/${collection.slug}`}>
                                                <Pencil size={14} className="mr-2" /> Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => setCollectionToDelete(collection.slug || null)}>
                                            <Trash size={14} />
                                        </Button>
                                        <Button asChild size="sm">
                                            <Link href={`/learn/${collection.slug}`}>
                                                <BookOpen size={14} className="mr-2" /> Learn
                                            </Link>
                                        </Button>
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
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the collection and all its cards.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isDeleting}
                        >
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
}