import { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ActionButtonProps extends ButtonProps {
    label: string;
    href?: string;
    side?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
}

export const ActionButton = ({
    label,
    children,
    href,
    side = "top",
    ...props
}: ActionButtonProps) => {
    return (

        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Button asChild={Boolean(href)} {...props} aria-label={label}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>

    );
};