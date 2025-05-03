'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import PackegesDetailContent from '@/components/pages/packages/PackegesDetailContent/PackegesDetailContent';

const Page = () => {
	const params = useParams();
	console.log('Current params:', params); // параметрлерди консольдо көрүү үчүн

	return <PackegesDetailContent />;
};

export default Page;
