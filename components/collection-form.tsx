"use client";

import { useSaveCollection } from "@/app/hooks/useColleciton";
import { Collection } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PromptTemplate from "./prompt-tempate";
import { getCookie } from "cookies-next";

interface CollectionFormProps {
    initialData?: Collection;
}
export default function CollectionForm({ initialData }: CollectionFormProps) {
    const username = getCookie("username") as string;
    const [title, setTitle] = useState(initialData?.title || "");
    const [desc, setDesc] = useState(initialData?.description || "");
    const [jsonInput, setJsonInput] = useState(
        initialData?.cards ? JSON.stringify(initialData.cards, null, 2) : ""
    );
    const { mutate: saveCollection, isPending } = useSaveCollection();

    const handleSubmit = async () => {
        if (!title || !jsonInput) return toast.error("Title and Cards are required");

        try {
            const cards = JSON.parse(jsonInput);
            saveCollection({
                username,
                data: {
                    id: initialData?.id,
                    slug: initialData?.slug,
                    title,
                    description: desc,
                    is_published: true,
                    cards
                }
            }, {
                onSuccess: () => {
                    toast.success("Collection saved!");
                },
                onError: (error) => {
                    toast.error("Database error. Check your connection.");
                    console.error(error);
                }
            });

        } catch (e) {
            toast.error("Invalid JSON format. Please check your brackets.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                <Input
                    placeholder="Collection Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-bold"
                />
                <Textarea
                    placeholder="Description (Optional)"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>

            <Tabs defaultValue="ai">
                <TabsList className="w-full">
                    <TabsTrigger value="ai" className="flex-1 gap-2"><Sparkles size={14} /> JSON / AI Import</TabsTrigger>
                    <TabsTrigger value="manual" className="flex-1">Manual (Read Only)</TabsTrigger>
                </TabsList>

                <TabsContent value="ai" className="space-y-4">
                    <PromptTemplate />
                    <div className="text-xs bg-muted p-3 rounded-md flex items-start gap-2">
                        <AlertCircle size={14} className="mt-0.5" />
                        <span>Paste the JSON array here. Ensure keys are &quot;word&quot;, &quot;reading&quot;, and &quot;meaning&quot;.</span>
                    </div>
                    <Textarea
                        className="h-[300px] font-mono text-sm"
                        placeholder='[{"word": "猫", "reading": "ねこ", "meaning": "Cat"}]'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                </TabsContent>

                <TabsContent value="manual" className="p-8 text-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">Use the JSON tab for fast bulk editing.</p>
                </TabsContent>
            </Tabs>

            <Button onClick={handleSubmit} className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : <><Save size={18} className="mr-2" /> Save Collection</>}
            </Button>
        </div>
    );
}