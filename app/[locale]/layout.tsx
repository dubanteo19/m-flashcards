import type { Metadata } from "next";
import {
  Geist_Mono,
  Be_Vietnam_Pro,
  Geist
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getMessages } from "next-intl/server";
import { Providers } from "@/app/providers/providers";
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

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
    default: "M Flashcard | Learn vocabulary fast",
    template: "%s | M Flashcard"
  },
  description: "A community-driven platform to learn multiple languages vocabulary. Create, share, and study flashcard collections with ease.",
  keywords: ["Vocabulary", "Flashcard", "Learning", "Multiple Languages", "M Flashcard"],
  authors: [{ name: "M Flashcard Team" }],
  openGraph: {
    title: "M Flashcard",
    description: "Master vocabulary with our community-sourced flashcard.",
    type: "website",
    locale: "en_US",
    url: "https://m-flashcard.dbt19.store",
    siteName: "M Flashcard",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        beVietnam.variable,
        "font-sans"
      )}
    >

      <body className="min-h-full flex flex-col bg-background text-foreground font-sans min-h-screen">
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}  >
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}