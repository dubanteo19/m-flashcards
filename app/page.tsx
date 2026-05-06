"use client";
import HomePageContent from "@/components/home-page-content";
import Loader from "@/components/loader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<Loader />}>
        <HomePageContent />
      </Suspense>
    </main>
  );
}
