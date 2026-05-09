"use client";

import { Collection } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PromptTemplate from "./prompt-tempate";
import { useSaveCollection } from "@/hooks/useColleciton";
import { LanguageSelector } from "./filter/language-selector";
import { LanguageCode } from "@/app/lib/enums";

interface CollectionFormProps {
    initialData?: Collection;
}
export default function CollectionForm({ initialData }: CollectionFormProps) {
    const { username } = useAuth();
    const [title, setTitle] = useState(initialData?.title || "");
    const [topic, setTopic] = useState("");
    const [desc, setDesc] = useState(initialData?.description || "");
    const [language, setLanguage] = useState(initialData?.language || LanguageCode.English);
    const [jsonInput, setJsonInput] = useState(
        initialData?.cards ? JSON.stringify(initialData.cards, null, 2) : ""
    );
    const { mutate: saveCollection, isPending } = useSaveCollection();

    const handleSubmit = async () => {
        if (!title || !jsonInput) return toast.error("Title and Cards are required");
        if (!username) return toast.error("You must be logged in to save a collection");

        try {
            const cards = JSON.parse(jsonInput);
            saveCollection({
                username,
                data: {
                    id: initialData?.id,
                    slug: initialData?.slug,
                    title,
                    language,
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
                <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <LanguageSelector
                        selected={language}
                        onSelect={setLanguage}
                        showAll={false}
                    />
                </div>
                <Input
                    placeholder="Collection Title"
                    maxLength={200}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-bold"
                />
                <Textarea
                    placeholder="Description (Optional)"
                    maxLength={400}
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
                    <Input
                        placeholder="Topic for AI-generated words (e.g. Food, Travel, Business)"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <PromptTemplate lang={language} topic={topic} />
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