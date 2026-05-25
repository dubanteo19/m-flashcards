import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Textarea } from "./textarea";

const INTERVAL = 4000;
const placeholders = [
    // --- TYPE 1: Short Topics / Ideas ---
    "The history of ancient spice routes and trade maps...",
    "How quantum computing will impact modern cryptography encryption...",
    "10 micro-habits that drastically improve daily productivity...",

    // --- TYPE 2: Long Paragraphs / Articles / News ---
    "Breaking News: Space Agency confirms the successful launch of its latest atmospheric monitoring satellite. The craft entered low Earth orbit early this morning, aiming to transmit unprecedented high-resolution climate data over the next decade...",

    // --- TYPE 2: Song Lyrics (Using real line breaks) ---
    "I'm waking up to ash and dust\nI wipe my brow and I sweat my rust\nI'm breathing in the chemicals\nI'm breaking in, shaping up, then checking out on the prison bus...",

    // --- TYPE 2: Article Extracts / Academic Prose ---
    "In recent years, the adoption of localized renewable microgrids has shifted from an eco-friendly novelty to a critical infrastructure necessity. Urban environments face unprecedented load spikes, making decentralized energy storage the primary defense against systemic grid failure..."
];

// 1. Make the interface generic using <TFieldValues> and <TName>
interface AnimatedInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    field: ControllerRenderProps<TFieldValues, TName>;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: () => void;
}

// 2. Pass those generics into the component function
export function AnimatedInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ field, handleChange, onBlur }: AnimatedInputProps<TFieldValues, TName>) {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % placeholders.length);
        }, INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const hasValue = typeof field.value === "string" && field.value.length > 0;

    return (
        <div className="relative w-full">
            <Textarea
                {...field}
                ref={(e) => {
                    field.ref(e);
                }}
                placeholder=""
                maxLength={1000}
                rows={3}
                className="min-h-[100px] max-h-[300px] resize-y relative z-10"
                onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                }}
                onBlur={() => {
                    field.onBlur(); // Keeps React Hook Form validation synced
                    if (onBlur) onBlur(); // Triggers your custom language detection
                }}
            />

            <AnimatePresence mode="wait">
                {!hasValue && (
                    <motion.div
                        key={index}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-3 left-3 text-gray-400 pointer-events-none z-0 text-sm select-none"
                    >
                        {placeholders[index]}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}