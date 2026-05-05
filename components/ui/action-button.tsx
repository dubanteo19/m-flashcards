import { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionButtonProps extends ButtonProps {
    label: string;
    side?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
}

export const ActionButton = ({
    label,
    children,
    side = "top",
    ...props
}: ActionButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <Button {...props}>
                        {children}
                        <span className="sr-only">{label}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side={side}>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};