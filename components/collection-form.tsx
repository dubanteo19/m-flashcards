"use client";

import { LanguageCode } from "@/app/lib/enums";
import { Collection } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useAIGenerate } from "@/hooks/useAI";
import { useSaveCollection } from "@/hooks/useColleciton";
import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { CooldownButton } from "./buttons/cooldown-button";
import { LanguageSelector } from "./filter/language-selector";
import { PublicSelector } from "./filter/public-selector";
import { AILoader } from "./loader";
import PromptTemplate from "./prompt-tempate";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize";

interface CollectionFormProps {
    initialData?: Collection;
}
export default function CollectionForm({ initialData }: CollectionFormProps) {
    const { username } = useAuth();
    const t = useTranslations();
    const [title, setTitle] = useState(initialData?.title || "");
    const [sourceText, setSourceText] = useState("");
    const [isAIMode, setIsAIMode] = useState(false);
    const [isPublished, setIsPublished] = useState<boolean>(initialData?.is_published || true);
    const [desc, setDesc] = useState(initialData?.description || "");
    const [language, setLanguage] = useState(initialData?.language || LanguageCode.English);
    const [jsonInput, setJsonInput] = useState(
        initialData?.cards ? JSON.stringify(initialData.cards, null, 2) : ""
    );
    const { mutate: saveCollection, isPending } = useSaveCollection();
    const { textareaRef, handleChange } =
        useAutoResizeTextarea(setSourceText);
    const { mutateAsync: triggerAIGenerate, isPending: isAIPending } = useAIGenerate();
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
                    is_published: isPublished,
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

    const handleAIGenerate = async () => {
        if (!sourceText) return toast.error("Please enter a topic for AI generation");
        try {
            const cards = await triggerAIGenerate({ sourceText, language });
            console.log("AI generated cards:", cards);
            setJsonInput(JSON.stringify(cards, null, 2));
        } catch (e) {
            toast.error("AI generation failed. Please try again.");
            console.error(e);
        }
    };
    if (isAIPending) {
        return (<AILoader />);
    }
    return (
        <div className="space-y-6 " >
            <div className="grid gap-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("common.language")}</label>
                        <LanguageSelector
                            selected={language}
                            onSelect={setLanguage}
                            showAll={false}
                        />
                    </div>
                    <PublicSelector
                        selected={isPublished}
                        onSelect={setIsPublished}
                    />

                </div>
                <Input
                    placeholder={t("dashboard.form.titlePlaceholder")}
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-bold"
                />
                <Textarea
                    placeholder={t("dashboard.form.descriptionPlaceholder")}
                    maxLength={150}
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
                    <Textarea
                        placeholder="Topic, article, news, song lyrics, paragraph..."
                        value={sourceText}
                        maxLength={1000}
                        rows={3}
                        className="min-h-[80px] max-h-[300px] resize-y"
                        ref={textareaRef}
                        onChange={handleChange}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={isAIMode}
                                onCheckedChange={setIsAIMode}
                                id="ai-mode"
                            />
                            <Label htmlFor="ai-mode">AI Mode</Label>
                        </div>
                        {isAIMode &&
                            <CooldownButton
                                isFetching={isAIPending}
                                variant={"default"}
                                disabled={!sourceText}
                                callback={handleAIGenerate}
                                cooldownDuration={5000}
                            >
                                <Sparkles
                                    size={18}
                                    className="mr-2"
                                />
                                AI Generate
                            </CooldownButton>
                        }
                    </div>


                    {!isAIMode &&
                        <PromptTemplate lang={language} sourceText={sourceText} />
                    }
                    <Textarea
                        className="h-[300px] font-mono text-sm"
                        placeholder='[{"word": "猫", "reading": "ねこ", "meaning": "Cat"}]'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />

                    <div className="text-xs bg-muted p-3 rounded-md flex items-start gap-2">
                        <AlertCircle size={14} className="mt-0.5" />
                        <span>{t("dashboard.form.pasteJsonHere")}</span>
                    </div>
                </TabsContent>

                <TabsContent value="manual" className="p-8 text-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">Use the JSON tab for fast bulk editing.</p>
                </TabsContent>
            </Tabs>

            <Button onClick={handleSubmit} className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : <><Save size={18} className="mr-2" /> {t("dashboard.form.submitButton")}</>}
            </Button>
        </div>
    );
}