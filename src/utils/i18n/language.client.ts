'use client';
import Cookies from 'js-cookie';

import { COOKIE_NAME, defaultLanguage } from './config';

export type Language = 'kg' | 'ru';

export function getCurrentLanguage() {
	const language = Cookies.get(COOKIE_NAME) as Language | undefined;
	return language || defaultLanguage;
}

export function setLanguage(language: Language) {
	Cookies.set(COOKIE_NAME, language, { expires: 365, path: '/' });
}
