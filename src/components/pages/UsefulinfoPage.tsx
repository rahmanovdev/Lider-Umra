'use client';
import scss from './UsefulinfoPage.module.scss';
import React from 'react';
import UsefulinfoContent from './usefulinfo/UsefulinfoContent/UsefulinfoContent';
import { useTranslations } from 'next-intl'

const UsefulinfoPage = () => {
	const t = useTranslations('usefullinfo')
	return (
		<div className={`container ${scss.pageContainer}`}>
			<h4 className={scss.title}>{t('title')}</h4>
			<UsefulinfoContent />
		</div>
	);
};

export default UsefulinfoPage;
