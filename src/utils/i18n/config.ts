export const COOKIE_NAME = 'language';
export const languages = ['kg', 'ru'] as const;
export const defaultLanguage: Language = 'kg';

export type Language = (typeof languages)[number];
