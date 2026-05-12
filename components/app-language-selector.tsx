"use client";

import { usePathname, useRouter } from "next/navigation";

import { FlagEn, FlagVi } from "./flag-icon";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";

export const AppLanguageSelector = () => {
    const router = useRouter();
    const pathname = usePathname();

    const locale = pathname.split("/")[1] || "en";

    const changeLanguage = (newLocale: string) => {
        router.push(
            pathname.replace(`/${locale}`, `/${newLocale}`)
        );
    };

    return (
        <Select
            value={locale}
            onValueChange={changeLanguage}
        >
            <SelectTrigger >
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem value="en">
                        <FlagEn />
                    </SelectItem>
                    <SelectItem value="vi">
                        <FlagVi />
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};