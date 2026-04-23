import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="animate-spin text-primary" size={32} />
        </div>
    );
}