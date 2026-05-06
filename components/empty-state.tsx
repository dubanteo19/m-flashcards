import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
}
export const EmptyState = ({ title, description }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-2xl border-2 border-dashed">
        <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>)