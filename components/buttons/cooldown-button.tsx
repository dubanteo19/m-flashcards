"use client"

import { useCooldown } from "@/hooks/useCooldown";
import { InlineLoader } from "../loader";
import { Button } from "../ui/button";

interface CooldownButtonProps {
    isFetching: boolean;
    callback: () => void;
    text: string
    cooldownDuration?: number;
}
export const CooldownButton = ({ isFetching, callback, text, cooldownDuration = 4000 }: CooldownButtonProps) => {
    const { trigger, cooldown } = useCooldown(cooldownDuration);

    const handleClick = () => {
        callback();
        trigger();
    };
    return (
        <Button
            variant="outline"
            size="sm"
            disabled={isFetching || cooldown}
            onClick={handleClick}
        >
            {isFetching ? <><InlineLoader /> {text}...</> : text}
        </Button>
    );
};