"use client"

import { useCooldown } from "@/hooks/useCooldown";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ActionButton } from "../ui/action-button";
import { ButtonProps } from "../ui/button";

interface CooldownButtonProps extends ButtonProps {
    isFetching: boolean;
    disabled?: boolean;
    label?: string;
    children: ReactNode,
    callback: () => void;
    cooldownDuration?: number;
}
export const CooldownButton = ({
    isFetching,
    disabled,
    label,
    callback,
    children,
    cooldownDuration = 4000,
    ...props
}: CooldownButtonProps) => {
    const { trigger, cooldown } = useCooldown(cooldownDuration);

    const handleClick = () => {
        callback();
        trigger();
    };
    return (
        <ActionButton
            variant="outline"
            size="sm"
            className={cn(isFetching && "animate-spin", cooldown && "cursor-not-allowed")}
            disabled={isFetching || cooldown || disabled}
            {...props}
            onClick={handleClick} label={label}    >
            {children}
        </ ActionButton>
    );
};