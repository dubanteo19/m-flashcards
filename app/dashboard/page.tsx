"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader, Loader2, LogOut, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { Collection } from "../lib/types";

export default function Dashboard() {
    const [username, setUsername] = useState<string | null>(null);
    const [collections, setCollections] = useState<Collection[]>([]);
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
                const { data, error } = await supabase
                    .from("collections")
                    .select("*, cards(count)")
                    .eq("author_username", savedUsername) // Use the local variable here!
                    .order("created_at", { ascending: false });

                if (error) throw error;

                setUsername(savedUsername);
                setCollections(data || []);
            } catch (err) {
                console.error("Dashboard init error:", err);
            } finally {
                setLoading(false);
            }
        };

        initDashboard();
    }, [router]);

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
                            collections.map((col) => (
                                <TableRow key={col.id}>
                                    <TableCell className="font-semibold">{col.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={col.is_published ? "default" : "secondary"}>
                                            {col.is_published ? "Public" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{col.cards_count?.[0]?.count ?? 0} cards</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/dashboard/edit/${col.id}`}>
                                            <Button variant="outline" size="sm"><Pencil size={14} className="mr-2" /> Edit</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}