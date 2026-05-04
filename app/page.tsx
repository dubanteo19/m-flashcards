"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollections } from "@/hooks/useColleciton";
import { motion } from "framer-motion";
import { BookOpen, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: collections, isLoading, refetch, isFetching } = useCollections();
  if (isLoading) return <Loader />
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">M Flashcards</h1>
          <p className="text-muted-foreground text-lg">Browse public collections and start learning.</p>
        </div>
        <Link href="/dashboard">
          <Button disabled={isFetching} variant="outline">Contributor Dashboard</Button>
        </Link>
      </div>
      <Button className="my-2" onClick={async () => await refetch()}> {isFetching ? "Refreshing..." : "Refresh"}</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections?.map((collection) => (
          <motion.div
            key={collection.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card className="h-full border-2 hover:border-primary transition-colors flex flex-col cursor-pointer" onClick={() => {
              router.push(`/learn/${collection.slug}`);
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