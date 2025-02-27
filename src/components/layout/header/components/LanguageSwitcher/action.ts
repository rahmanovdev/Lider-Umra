'use server';
import { setLanguage } from '@/utils/i18n/language';

export async function changeLanguage(formData: FormData) {
	const langCode = formData.get('language') as 'kg' | 'ru';
	await setLanguage(langCode);
}
