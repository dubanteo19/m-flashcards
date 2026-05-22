"use client";
import { LanguageCode } from "@/app/lib/enums";
import { Collection } from "@/app/lib/types/cards";
import { CollectionFormValues, collectionSchema } from "@/app/lib/validations/collection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize";
import { useAIGenerate } from "@/hooks/useAI";
import { useSaveCollection } from "@/hooks/useColleciton";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CooldownButton } from "./buttons/cooldown-button";
import { LanguageSelector } from "./filter/language-selector";
import { PublicSelector } from "./filter/public-selector";
import { AILoader } from "./loader";
import PromptTemplate from "./prompt-tempate";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Switch } from "./ui/switch";

interface CollectionFormProps {
    initialData?: Collection;
    onSuccess?: () => void;
}
export default function CollectionForm({ initialData, onSuccess }: CollectionFormProps) {
    const { username } = useAuth();
    const t = useTranslations();
    const [language, setLanguage] = useState(initialData?.language || LanguageCode.English);
    const { mutate: saveCollection, isPending } = useSaveCollection();
    const form = useForm({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            sourceText: "",
            prompt: "",
            isAIMode: false,
            wordCount: 15,
            isPublished: initialData?.is_published ?? true,
            jsonInput: initialData?.cards
                ? JSON.stringify(initialData.cards, null, 2)
                : "",
        },
    });
    const sourceText = form.watch("sourceText");
    const isAIMode = form.watch("isAIMode");
    const wordCount = form.watch("wordCount");

    const { textareaRef, handleChange } =
        useAutoResizeTextarea((value) =>
            form.setValue("sourceText", value)
        );
    const { mutateAsync: triggerAIGenerate, isPending: isAIPending } = useAIGenerate();
    const handleSubmit = async (data: CollectionFormValues) => {
        if (!username) {
            toast.error("You must be logged in");
            return;
        }

        try {
            const cards = JSON.parse(data.jsonInput);

            saveCollection(
                {
                    username,
                    data: {
                        id: initialData?.id,
                        slug: initialData?.slug,
                        title: data.title,
                        language,
                        description: data.description,
                        is_published: data.isPublished,
                        cards,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("Collection saved!");
                        onSuccess?.();
                    },
                    onError: (error) => {
                        toast.error("Database error");
                        console.error(error);
                    },
                }
            );
        } catch {
            toast.error("Invalid JSON format");
        }
    };

    const handleAIGenerate = async () => {
        if (!sourceText) {
            toast.error("Please enter a topic");
            return;
        }

        try {
            const prompt = form.getValues("prompt");

            if (!prompt) {
                console.error("No prompt provided");
                return;
            }
            const cards = await triggerAIGenerate({ prompt });

            form.setValue(
                "jsonInput",
                JSON.stringify(cards, null, 2)
            );
        } catch (e) {
            toast.error("AI generation failed");
            console.error(e);
        }
    };
    const shouldShowPromptTemplate = !isAIMode && sourceText;

    if (isAIPending) return <AILoader />

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
        >
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
                        selected={form.watch("isPublished")}
                        onSelect={(v) =>
                            form.setValue("isPublished", v)
                        }
                    />

                </div>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                placeholder={t("dashboard.form.titlePlaceholder")}
                                className="text-lg font-bold"
                                maxLength={100}
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Textarea
                                {...field}
                                placeholder={t("dashboard.form.descriptionPlaceholder")}
                                maxLength={150}
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />
            </div>

            <Tabs defaultValue="ai">
                <TabsList className="w-full">
                    <TabsTrigger value="ai" className="flex-1 gap-2"><Sparkles size={14} /> JSON / AI Import</TabsTrigger>
                    <TabsTrigger value="manual" className="flex-1">Manual (Read Only)</TabsTrigger>
                </TabsList>

                <TabsContent value="ai" className="space-y-4">
                    <Controller
                        name="sourceText"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Textarea
                                    {...field}
                                    ref={textareaRef}
                                    placeholder="Topic, article, news..."
                                    maxLength={1000}
                                    rows={3}
                                    className="min-h-[80px] max-h-[300px] resize-y"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )}
                    />

                    <div className="flex flex-wrap items-center gap-4">
                        <Controller
                            name="isAIMode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className="w-auto flex-none items-center gap-2"
                                    orientation={"horizontal"}
                                    data-invalid={fieldState.invalid}>
                                    <Switch
                                        id="ai-mode"
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        data-invalid={fieldState.invalid}
                                    />
                                    <FieldLabel htmlFor="ai-mode">
                                        AI Mode
                                    </FieldLabel>
                                </Field>
                            )}
                        />

                        <Controller
                            name="wordCount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="horizontal"
                                    className="w-auto flex-none items-center gap-2"
                                    data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="wordCount">
                                        Số từ
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        className="w-16 h-7 px-2 py-0 text-xs"
                                    />

                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                        />

                        {isAIMode &&
                            <CooldownButton
                                isFetching={isAIPending}
                                size={"sm"}
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
                    {shouldShowPromptTemplate &&
                        <PromptTemplate
                            onPromptChange={(v) =>
                                form.setValue("prompt", v)
                            }
                            lang={language}
                            sourceText={sourceText}
                            wordCount={wordCount}
                        />
                    }
                    <Controller
                        name="jsonInput"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Textarea
                                    {...field}
                                    className="h-[300px] text-sm"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
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

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : <><Save size={18} className="mr-2" /> {t("dashboard.form.submitButton")}</>}
            </Button>
        </form>
    );
}