"use client";

import { Collection } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { collectionService } from "@/services/collectionService";
import { motion } from "framer-motion";
import { BookOpen, Loader2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchPublicCollections() {
      const collections = await collectionService.getAllCollections();
      setCollections(collections);
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
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card className="h-full border-2 hover:border-primary transition-colors flex flex-col cursor-pointer" onClick={() => {
              router.push(`/learn/${collection.id}`);
            }}>
              <CardHeader className="flex-1">
                <CardTitle className="text-xl">{collection.title}</CardTitle>
                <CardDescription className="line-clamp-2">{collection.description}</CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between items-center text-sm pt-4 border-t bg-muted/20">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <User size={14} className="text-primary" /> {collection.author_username}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {collection.cards_count || 0}
                  </span>
                </div>
                <Button asChild size="sm">
                  <Link href={`/learn/${collection.id}`}>
                    Learn
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </main >
  );
}