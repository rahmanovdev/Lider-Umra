'use client';

import Cookies from 'js-cookie';
import { COOKIE_NAME, defaultLanguage, type Language } from './config';

export function getCurrentLanguage() {
	const language = Cookies.get(COOKIE_NAME) ?? defaultLanguage;
	return language;
}

export function setLanguage(language: Language) {
	Cookies.set(COOKIE_NAME, language, { expires: 365 });
}
