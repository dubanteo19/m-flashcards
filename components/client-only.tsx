"use client";

import { useSyncExternalStore } from 'react';

function subscribe() {
    return () => { }; // No-op subscribe
}

export function ClientOnly({ children }: { children: React.ReactNode }) {
    const isClient = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );

    return isClient ? <>{children}</> : null;
}