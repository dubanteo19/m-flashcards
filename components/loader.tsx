import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="animate-spin text-primary" size={32} />
        </div>
    );
}
export const InlineLoader = () => {
    return <Loader2 className="animate-spin text-primary" size={32} />;
}