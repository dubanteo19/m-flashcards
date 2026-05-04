import { ClientOnly } from "@/components/client-only";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>
        <ClientOnly>
            {children}
        </ClientOnly>
    </AuthProvider>
}