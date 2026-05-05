import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface ActionButtonProps extends ButtonProps {
    href: string;
    children: ReactNode;
}
export const LinkButton = ({
    children,
    href,
    ...props
}: ActionButtonProps) => {
    return (
        <Button asChild size="sm" {...props}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};