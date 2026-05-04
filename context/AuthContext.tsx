"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    username: string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(() => {
        return (getCookie("username") as string) || null;
    });

    const logout = () => {
        deleteCookie("username");
        setUsername(null);
        router.push("/login");
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ username, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};