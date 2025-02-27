'use client';
import React from 'react';
import styles from './Loading.module.scss';
import { useTranslations } from 'next-intl';
const Loading: React.FC = () => {
	const t = useTranslations();
	return (
		<div className={styles.loading}>
			<div className={styles.loading__inner}>
				<div className={styles.spinner}></div>
				<span>{t('loading')}</span>
			</div>
		</div>
	);
};

export default Loading;
