"use client";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

// Create the async persister
const asyncPersister = typeof window !== "undefined"
    ? createAsyncStoragePersister({
        storage: window.localStorage,
    })
    : null;

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    // If we're on the server, just render the children without the persister logic
    if (!asyncPersister) {
        return (
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: {} as any }}>
                {children}
            </PersistQueryClientProvider>
        );
    }

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncPersister }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}