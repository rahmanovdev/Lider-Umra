'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import scss from './LayoutSite.module.scss';
import { useSize } from '@/hooks/use-size';

interface LayoutSiteProps {
	children: ReactNode;
}
const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const size = useSize('#header');
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		// return <Loader />;
	}

	return (
		<div className={scss.LayoutSite}>
			<Header />
			<main style={{ marginTop: size?.height }}>{children}</main>
			<Footer />
		</div>
	);
};

export default LayoutSite;
