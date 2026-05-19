import { useCallback, useRef } from "react";

export function useAutoResizeTextarea(
    setValue: (value: string) => void
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);

            const textarea = textareaRef.current;

            if (!textarea) return;

            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        [setValue]
    );

    return {
        textareaRef,
        handleChange,
    };
}