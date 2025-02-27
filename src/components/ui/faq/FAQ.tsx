'use client';
import React from 'react';
import styles from './FAQ.module.scss';
import { Accordion } from '../accordion';
import { IoIosArrowDown } from 'react-icons/io';
import { useGetFaqsQuery } from '@/redux/api/faq';
import Loading from '../loading/Loading';
import { useTranslations } from 'next-intl';

const FAQ: React.FC = () => {
	const t = useTranslations('faq');
	const { data, isLoading, error } = useGetFaqsQuery();

	const faq = data
		? data.map(v => ({
				value: `${v.id}`,
				label: v.question,
				content: v.answer
		  }))
		: [];

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>{t('title')}</h2>
				{isLoading ? (
					<Loading />
				) : error || !data ? (
					<div>{t('error')}</div>
				) : (
					<Accordion
						trailingContent={({ isActive }) => (
							<IoIosArrowDown
								style={{
									transform: isActive ? 'rotate(180deg)' : '',
									transition: 'all .25s'
								}}
							/>
						)}
						items={faq}
					/>
				)}
			</div>
		</section>
	);
};

export default FAQ;
