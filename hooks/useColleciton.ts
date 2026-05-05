import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionService } from "@/services/collectionService";
import { Collection } from "@/app/lib/types";

export function useCollections() {
    return useQuery({
        queryKey: ["collections"], // The unique key for caching
        queryFn: () => collectionService.getAllCollections(),
    });
}

export function useUserCollections(username: string) {
    return useQuery({
        queryKey: ["user-collections"],
        queryFn: () => collectionService.getByUsername(username),
    });
}

export function useCollectionBySlug(slug: string) {
    return useQuery<Collection>({
        queryKey: ["slug-collections", slug],
        queryFn: () => collectionService.getBySlug(slug),
    });
}
export function useSaveCollection() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ username, data }: { username: string, data: any }) =>
            collectionService.saveCollection(username, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (slug: string) =>
            collectionService.deleteCollection(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}