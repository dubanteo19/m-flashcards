export enum LanguageCode {
    English = 'en',
    Chinese = 'zh',
    Japanese = 'ja',
    Korean = 'ko'
}

export const languageMap: Record<LanguageCode, string> = {
    [LanguageCode.English]: "en-US",
    [LanguageCode.Chinese]: "zh-CN",
    [LanguageCode.Japanese]: "ja-JP",
    [LanguageCode.Korean]: "ko-KR",
};