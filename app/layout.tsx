import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Providers } from "./providers/providers";
const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- UPDATED METADATA ---
export const metadata: Metadata = {
  title: {
    default: "M Flashcards | Learn vocabulary fast",
    template: "%s | M Flashcards"
  },
  description: "A community-driven platform to learn multiple languages vocabulary. Create, share, and study flashcard collections with ease.",
  keywords: ["Vocabulary", "Flashcards", "Learning", "Multiple Languages", "M Flashcards"],
  authors: [{ name: "M Flashcards Team" }],
  openGraph: {
    title: "M Flashcards",
    description: "Master vocabulary with our community-sourced flashcards.",
    type: "website",
    locale: "en_US",
    url: "https://m-flashcards.dbt19.store",
    siteName: "M Flashcards",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        outfit.variable,
        "font-sans"
      )}
    >

      <Providers>
        <body className="min-h-full flex flex-col bg-background text-foreground font-sans min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}