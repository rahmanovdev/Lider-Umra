import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n/request.ts');

const nextConfig: NextConfig = {
	optimizeFonts: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			},
			{
				protocol: 'http',
				hostname: '**'
			}
		]
	},
	devIndicators: {
		appIsrStatus: false
	}
};

export default withNextIntl(nextConfig);
