"use client";

import { usePathname, useRouter } from "next/navigation";

import { FlagUs, FlagVi } from "./flag-icon";
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
            <SelectTrigger className="w-[70px] flex justify-center p-0" >
                <SelectValue />
            </SelectTrigger>

            <SelectContent className="min-w-[70px] ">
                <SelectGroup>
                    <SelectItem value="en">
                        <FlagUs className="w-16"  />
                    </SelectItem>
                    <SelectItem value="vi">
                        <FlagVi className="w-16" />
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};