import { supabase } from "./supabase";

export async function saveCollection(
    username: string,
    data: {
        slug?: string;
        title: string;
        description: string;
        is_published: boolean;
        cards: { word: string; reading: string; meaning: string }[];
    }
) {
    const slug = data.slug || data.title.toLowerCase().replace(/ /g, "-") + "-" + Math.floor(Math.random() * 1000);

    const { error: colError } = await supabase.from("collections").upsert({
        slug: slug,
        title: data.title,
        description: data.description,
        author_username: username,
        is_published: data.is_published,
    });

    if (colError) throw colError;

    if (data.slug) {
        await supabase.from("cards").delete().eq("collection_id", slug);
    }
    const cardsToInsert = data.cards.map((card, index) => ({
        collection_id: slug,
        word: card.word,
        reading: card.reading,
        meaning: card.meaning,
        order_index: index,
    }));

    const { error: cardError } = await supabase.from("cards").insert(cardsToInsert);
    if (cardError) throw cardError;

    return slug;
}