import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionService } from "@/services/collectionService";
import { Collection, CollectionFilters } from "@/app/lib/types";

export function useCollections(filters: CollectionFilters) {
    return useQuery({
        queryKey: ["collections", filters], // React Query hashes the object automatically
        queryFn: () => collectionService.getAllCollections(filters),
    });
}

export function useUserCollections(username: string) {
    return useQuery<Collection[]>({
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