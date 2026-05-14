import { Providers } from "@/app/providers/providers";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import {
  Be_Vietnam_Pro,
  Geist,
  Geist_Mono
} from "next/font/google";
import { Toaster } from "sonner";
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
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    en: {
      title: "M Flashcard | Learn vocabulary fast",
      description:
        "A community-driven platform to learn multiple languages vocabulary. Create, share, and study flashcard collections with ease.",
      ogLocale: "en_US"
    },
    vi: {
      title: "M Flashcard | Học từ vựng nhanh chóng",
      description:
        "Nền tảng học từ vựng đa ngôn ngữ do cộng đồng xây dựng. Tạo, chia sẻ và học bộ flashcard dễ dàng.",
      ogLocale: "vi_VN"
    }
  }[locale] ?? {
    title: "M Flashcard",
    description: "Learn vocabulary fast",
    ogLocale: "en_US"
  };

  return {
    metadataBase: new URL("https://fc.dbt19.site"),
    title: {
      default: meta.title,
      template: "%s | M Flashcard"
    },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        vi: "/vi"
      }
    },
    keywords: [
      "Vocabulary",
      "Flashcard",
      "Learning",
      "Multiple Languages",
      "M Flashcard"
    ],

    authors: [{ name: "Dbt19's Team" }],

    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: meta.ogLocale,
      url: `https://fc.dbt19.site/${locale}`,
      siteName: "M Flashcard",

      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "M Flashcard"
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"]
    }
  };
}
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
      <body className="flex flex-col bg-background text-foreground font-sans min-h-screen">
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}  >
            <Header />
            <main className="flex-1 flex flex-col">
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