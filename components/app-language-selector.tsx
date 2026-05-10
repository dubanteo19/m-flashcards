"use client";

import { usePathname, useRouter } from "next/navigation";

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
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem value="en">
                        English
                    </SelectItem>

                    <SelectItem value="vi">
                        Tiếng Việt
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};