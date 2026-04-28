import { supabase } from "@/app/lib/supabase";
import { RawCollectionResponse } from "@/app/lib/types";
import { toCollection } from "@/lib/utils";

export const collectionService = {
    async getByUsername(username: string) {
        const { data, error } = await supabase
            .from("collections")
            .select("*, cards(count)")
            .eq("author_username", username)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return (data as RawCollectionResponse[]).map(toCollection);
    },
    async getAllCollections() {
        const { data, error } = await supabase
            .from("collections")
            .select("*, cards(count)")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return (data as RawCollectionResponse[]).map(toCollection);
    },

    async getCollectionById(collectionId: string) {
        const { data, error } = await supabase
            .from("collections")
            .select("*, cards(*)")
            .eq("id", collectionId)
            .single();

        if (error) throw error;
        return data;
    }
};
