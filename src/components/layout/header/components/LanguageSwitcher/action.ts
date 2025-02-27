'use server';
import { setLanguage } from '@/utils/i18n/language.server';

export async function changeLanguage(formData: FormData) {
	const langCode = formData.get('language') as 'kg' | 'ru';
	await setLanguage(langCode);
}
