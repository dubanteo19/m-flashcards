"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabase";
import { Collection } from "@/app/lib/types";

export default function HomePage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicCollections() {
      const { data, error } = await supabase
        .from("collections")
        .select("*, cards(count)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) setCollections(data);
      setLoading(false);
    }
    fetchPublicCollections();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">M Flashcards</h1>
          <p className="text-muted-foreground text-lg">Browse public collections and start learning.</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Contributor Dashboard</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <motion.div
            key={col.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card className="h-full border-2 hover:border-primary transition-colors flex flex-col">
              <CardHeader className="flex-1">
                <CardTitle className="text-xl">{col.title}</CardTitle>
                <CardDescription className="line-clamp-2">{col.description}</CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between items-center text-sm pt-4 border-t bg-muted/20">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <User size={14} className="text-primary" /> {col.author_username}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {col.cards?.[0]?.count || 0}
                  </span>
                </div>
                <Link href={`/learn/${col.id}`}>
                  <Button size="sm">Learn</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}