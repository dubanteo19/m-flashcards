import { GlobeIcon, User } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface PublicSelectorProps {
    selected?: boolean;
    onSelect: (value: boolean) => void;
}

export function PublicSelector({
    selected = true,
    onSelect,
}: PublicSelectorProps) {
    const t = useTranslations("common");
    return (
        <Select
            value={selected.toString()}
            onValueChange={(value) => onSelect(value === "true")}
        >
            <SelectTrigger>
                <SelectValue placeholder="Public" />
            </SelectTrigger>

            <SelectContent position="popper">
                <SelectItem value="true">
                    <div className="flex items-center">
                        <GlobeIcon className="mr-2" />
                        {t("public")}
                    </div>
                </SelectItem>
                <SelectItem value="false">
                    <div className="flex items-center">
                        <User className="mr-2" />
                        {t("private")}
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}