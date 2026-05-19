import { LanguageCode } from "./enums";

export type AIGenerateRequest = {
    sourceText: string;
    language: LanguageCode;
};