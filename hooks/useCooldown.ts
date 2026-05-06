import { useState } from "react";

export function useCooldown(ms: number) {
    const [cooldown, setCooldown] = useState(false);

    const trigger = () => {
        if (cooldown) return false;
        setCooldown(true);
        setTimeout(() => setCooldown(false), ms);
        return true;
    };

    return { cooldown, trigger };
}