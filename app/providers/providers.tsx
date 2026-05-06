"use client";

import ReactQueryProvider from "./react-query-provider";
import { AppTooltipProvider } from "./tooltip-provider";


type Provider = React.ComponentType<{ children: React.ReactNode }>;

function composeProviders(providers: Provider[]) {
    return function ComposedProviders({ children }: { children: React.ReactNode }) {
        return providers.reduceRight((acc, Provider) => {
            return <Provider>{acc}</Provider>;
        }, children);
    };
}


export const Providers = composeProviders([
    ReactQueryProvider,
    AppTooltipProvider,
]);