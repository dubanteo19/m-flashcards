import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const alt = "Xem trước lời mời học từ vựng";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Map Language Codes to Flag Emojis for native OG rendering
const flagMap: Record<string, string> = {
    en: "🇬🇧",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
    const { slug } = await params;

    // Đọc searchParams chuẩn từ URL bằng request.nextUrl
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title") || slug.replace(/-/g, " ");
    const invitor = searchParams.get("invitor") || "Một người bạn";
    const lang = searchParams.get("lang") || "en";
    const flag = flagMap[lang] || "🌐";
    return new ImageResponse(
        (
            <div tw="h-full w-full flex flex-col items-center justify-center bg-slate-50 p-10">
                <div tw="flex flex-col items-center justify-center bg-white rounded-[24px] shadow-2xl w-[800px] h-[420px] p-8 border-2 border-slate-200 position-relative">

                    {/* Language Flag Badge */}
                    <div tw="text-[54px] mb-2">{flag}</div>

                    <span tw="text-[24px] text-slate-500 mb-2 font-normal text-center">
                        <strong tw="text-slate-800 font-semibold">
                            {invitor}
                        </strong>&nbsp;đã mời bạn học bộ từ vựng:
                    </span>

                    <h1 tw="text-[46px] font-bold text-slate-900 text-center m-0 max-w-[720px] truncate mb-6">
                        {title}
                    </h1>

                    <span tw="px-8 py-3 bg-[#FDC700] text-white rounded-full font-semibold text-[22px] shadow-sm">
                        Bắt đầu học ngay ✨
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}