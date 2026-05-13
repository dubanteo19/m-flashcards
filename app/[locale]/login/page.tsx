"use client";

import { ROUTES } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const t = useTranslations("login");
    const router = useRouter();
    const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedName = username.trim();
        if (!trimmedName) return;
        await setCookie('username', trimmedName, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax'
        });
        router.refresh();
        router.push(ROUTES.DASHBOARD);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary rounded-xl text-primary-foreground">
                            <Languages size={32} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
                    <CardDescription>{t("subtitle")}</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent>
                        <Input
                            placeholder={t("usernamePlaceholder")}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-lg py-6"
                            autoFocus
                        />
                    </CardContent>
                    <CardFooter className="mt-4">
                        <Button type="submit" className="w-full text-lg py-6" disabled={!username.trim()}>
                            {t("enterDashboard")}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}