import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n/request.ts');

const nextConfig: NextConfig = {
	optimizeFonts: true,
	images: {
		domains: [
			'dynamic-media-cdn.tripadvisor.com',
			'ic.pics.livejournal.com',
			'www.google.com',
			'147.45.159.88'
		]
	},
	devIndicators: {
		appIsrStatus: false
	}
};

export default withNextIntl(nextConfig);
