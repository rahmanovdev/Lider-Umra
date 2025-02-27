'use client';
import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NotFoundPage: React.FC = () => {
	const t = useTranslations('not-found');
	const { back } = useRouter();

	return (
		<div className={styles.notFoundPage}>
			<div className={styles.patternOverlay}></div>

			<div className={styles.content}>
				<h1 className={styles.title}>404</h1>
				<h2 className={styles.subtitle}>{t('pageNotFound')}</h2>
				<p className={styles.message}>
					{t('quote')}
					<br />
					{t('lostMessage')}
				</p>
				<button onClick={back} className={styles.backButton}>
					{t('returnBack')}
				</button>
			</div>

			<div className={styles.decorTop}></div>
			<div className={styles.decorBottom}></div>
		</div>
	);
};

export default NotFoundPage;
