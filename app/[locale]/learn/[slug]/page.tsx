import LearnClient from "./learn-client";
import { Metadata } from "next";

type Props = {
	params: Promise<
		{ slug: string }>;
	searchParams: Promise<{
		title?: string;
		desc?: string;
		invitor?: string;
		lang?: string;
	}>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;

	const collectionTitle = resolvedSearchParams.title || slug.replace(/-/g, " ");
	const invitor = resolvedSearchParams.invitor || "Ai đó";
	const description = resolvedSearchParams.desc || "Mở rộng vốn từ vựng của bạn với thẻ ghi nhớ (flashcards) tương tác.";

	// Vietnamese Translation for SEO Title
	const title = `${invitor} đã mời bạn học bộ từ vựng "${collectionTitle}"!`;

	// Pass query parameters safely into the OG image URL string
	const ogSearchParams = new URLSearchParams();
	if (resolvedSearchParams.title) ogSearchParams.set("title", resolvedSearchParams.title);
	if (resolvedSearchParams.invitor) ogSearchParams.set("invitor", resolvedSearchParams.invitor);
	if (resolvedSearchParams.lang) ogSearchParams.set("lang", resolvedSearchParams.lang);

	const ogImageUrl = `/vi/learn/${slug}/og?${ogSearchParams.toString()}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: "Lời mời học từ vựng",
				},
			],
		},
	};
}

export default async function Page({ params }: Props) {
	return <LearnClient params={params} />;
}