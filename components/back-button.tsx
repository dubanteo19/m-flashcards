import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
    return (
        <Link
            href="/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
            <ChevronLeft size={16} className="mr-1" /> Back to Dashboard
        </Link>
    );
}