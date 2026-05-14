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

            <SelectContent  position="popper">
                <SelectItem className="" value="true">{t("public")}</SelectItem>
                <SelectItem value="false">{t("private")}</SelectItem>
            </SelectContent>
        </Select>
    );
}