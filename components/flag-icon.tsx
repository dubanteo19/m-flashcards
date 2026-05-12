import { LanguageCode } from '@/app/lib/enums';
import { cn } from '@/lib/utils';
import React from 'react';


export const FlagVi = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 36 36"
        className={cn("h-auto", className)}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"> </g>
        <g id="SVGRepo_iconCarrier">
            <path fill="#DA251D" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path>
            <path fill="#FF0" d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"></path>
        </g>
    </svg>
);

export const FlagEn = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 55.2 38.4"
        className={cn("h-auto", className)}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#FEFEFE"
            d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01
      C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4z"
        />
        <polygon
            fill="#C8102E"
            points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35
      31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03"
        />
        <path fill="#012169" d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92z" />
        <path fill="#012169" d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92z" />
        <path fill="#012169" d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94z" />
        <path fill="#012169" d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94z" />

        <polygon fill="#012169" points="0,12.8 7.65,12.8 0,8.97" />
        <polygon fill="#012169" points="55.2,12.8 47.51,12.8 55.2,8.95" />
        <polygon fill="#012169" points="55.2,25.6 47.51,25.6 55.2,29.45" />
        <polygon fill="#012169" points="0,25.6 7.65,25.6 0,29.43" />

        <polygon fill="#C8102E" points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4" />
        <polygon fill="#C8102E" points="19.01,25.6 14.75,25.6 0,32.98 0,35.13" />
        <polygon fill="#C8102E" points="10.52,12.81 14.78,12.81 0,5.41 0,7.55" />
        <polygon fill="#C8102E" points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88" />
    </svg>
);

export const FlagZh = ({ className }: { className?: string }) => (
    <svg

        className={cn("h-auto", className)}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 55.2 38.4"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#DE2910"
            d="M3.01,0h49.17c1.66,0.01,3.01,1.37,3.01,3.03v32.33c0,1.66-1.35,3.02-3.01,3.03L3,38.4
      c-1.65-0.02-3-1.38-3-3.03V3.03C0,1.37,1.35,0.01,3.01,0L3.01,0z"
        />
        <polygon
            fill="#FFDE00"
            points="8.4,3.84 11.79,14.26 2.92,7.82 13.88,7.82 5.01,14.26 8.4,3.84"
        />
        <polygon
            fill="#FFDE00"
            points="18.75,2.07 18.43,5.71 16.55,2.58 19.91,4.01 16.35,4.83 18.75,2.07"
        />
        <polygon
            fill="#FFDE00"
            points="23.22,6.34 21.51,9.57 20.99,5.96 23.54,8.58 19.94,7.95 23.22,6.34"
        />
        <polygon
            fill="#FFDE00"
            points="23.64,12.78 20.77,15.03 21.77,11.52 23.02,14.95 19.99,12.91 23.64,12.78"
        />
        <polygon
            fill="#FFDE00"
            points="18.68,15.48 18.51,19.13 16.5,16.08 19.92,17.37 16.4,18.34 18.68,15.48"
        />
    </svg>
);

export const FlagJa = ({ className }: { className?: string }) => (
    <svg
        className={cn("h-auto", className)}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 55.7 38.9"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#FFFFFF"
            stroke="#CCCCCC"
            strokeWidth="0.5"
            d="M3.28,0.25h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.28
      c-1.67,0-3.03-1.37-3.03-3.03V3.28C0.25,1.61,1.61,0.25,3.28,0.25z"
        />
        <circle
            cx="27.85"
            cy="19.45"
            r="11.52"
            fill="#BC002D"
        />
    </svg>
);

export const FlagKo = ({ className }: { className?: string }) => (
    <svg
        className={cn("h-auto", className)}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 55.7 38.9"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Background */}
        <rect
            x="0.25"
            y="0.25"
            width="55.2"
            height="38.4"
            rx="3"
            fill="#FEFEFE"
            stroke="#CCCCCC"
            strokeWidth="0.5"
        />

        {/* Taegeuk (center) */}
        <path
            fill="#C62631"
            d="M19.86,14.13c2.94-4.41,8.9-5.6,13.31-2.66c4.41,2.94,5.6,8.9,2.66,13.31
      c-2.94,4.41-8.9,5.6-13.31,2.66C18.11,24.5,16.92,18.54,19.86,14.13z"
        />
        <path
            fill="#303C70"
            d="M19.86,14.13c-1.47,2.21-0.87,5.19,1.33,6.66c2.21,1.47,5.19,0.87,6.66-1.33
      c1.47-2.21,4.45-2.8,6.66-1.33c2.21,1.47,2.8,4.45,1.33,6.66
      c-2.94,4.41-8.9,5.6-13.31,2.66C18.11,24.5,16.92,18.54,19.86,14.13z"
        />

        {/* Trigrams (simplified but clean) */}
        <g stroke="#252422" strokeWidth="1.6">
            <line x1="8.5" y1="12.3" x2="13.9" y2="4.3" />
            <line x1="10.5" y1="13.7" x2="15.9" y2="5.7" />
            <line x1="12.5" y1="15.0" x2="17.9" y2="7.0" />

            <line x1="37.8" y1="31.9" x2="43.2" y2="23.9" />
            <line x1="39.8" y1="33.2" x2="45.2" y2="25.2" />
            <line x1="41.8" y1="34.5" x2="47.2" y2="26.5" />

            <line x1="8.5" y1="26.5" x2="13.9" y2="34.5" />
            <line x1="10.5" y1="25.2" x2="15.9" y2="33.2" />
            <line x1="12.5" y1="23.9" x2="17.9" y2="31.9" />

            <line x1="37.8" y1="7.0" x2="43.2" y2="15.0" />
            <line x1="39.8" y1="5.7" x2="45.2" y2="13.7" />
            <line x1="41.8" y1="4.3" x2="47.2" y2="12.3" />
        </g>
    </svg>
);


type FlagComponent = React.ComponentType<{ className?: string }>;

export const LanguageFlags: Record<LanguageCode, FlagComponent> = {
    en: FlagEn,
    zh: FlagZh,
    ja: FlagJa,
    ko: FlagKo,
};


interface FlagProps {
    language: LanguageCode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "w-6",
    md: "w-16 md:w-24",
    lg: "w-20 md:w-28 lg:w-[120px]"
};

export const Flag = ({
    language,
    className,
    size = "sm"
}: FlagProps) => {
    const Component = LanguageFlags[language];

    return (
        <div
            className={cn(
                "shadow h-auto",
                sizeClasses[size],
                className
            )}
        >
            <Component />
        </div>
    );
};