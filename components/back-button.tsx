import { ROUTES } from "@/app/lib/constants";
import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";


export default function BackButton() {
    const t = useTranslations("common");
    return (
        <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
            <ChevronLeft size={16} className="mr-1" /> {t("backToDashboard")}
        </Link>
    );
}