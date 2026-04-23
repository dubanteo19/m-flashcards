"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem("username", username.trim());
            router.push("/dashboard");
        }
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
                    <CardTitle className="text-2xl font-bold">Contributor Login</CardTitle>
                    <CardDescription>Enter your username to manage your collections</CardDescription>
                </CardHeader>-
                <form onSubmit={handleLogin}>
                    <CardContent>
                        <Input
                            placeholder="Username (e.g. Tanaka_Dev)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-lg py-6"
                            autoFocus
                        />
                    </CardContent>
                    <CardFooter className="mt-4">
                        <Button type="submit" className="w-full text-lg py-6" disabled={!username.trim()}>
                            Enter Dashboard
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}