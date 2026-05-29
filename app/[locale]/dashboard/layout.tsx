import { ClientOnly } from "@/components/client-only";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientOnly>
            {children}
        </ClientOnly>
    );
}