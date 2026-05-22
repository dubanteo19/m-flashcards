import { ROUTES } from "@/app/lib/constants";
import { LinkButton } from "../ui/link-button";

export function CollectionNotFound() {
    return (
        <div className="min-h-screen flex-center flex-col ">
            <p className="mb-4">No cards found in this collection.</p>
            <LinkButton href={ROUTES.DASHBOARD}>Back to Library</LinkButton>
        </div>
    );
}