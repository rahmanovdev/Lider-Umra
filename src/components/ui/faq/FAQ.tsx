'use client';
import React from 'react';
import styles from './FAQ.module.scss';
import { Accordion } from '../accordion';
import { IoIosArrowDown } from 'react-icons/io';
import { useGetFaqsQuery } from '@/redux/api/faq';

const FAQ: React.FC = () => {
	const { data, isLoading, error } = useGetFaqsQuery();
	const faq = data
		? data.map(v => ({
				value: `${v.id}`,
				label: v.question,
				content: v.answer
		  }))
		: [];
	if (isLoading) {
		return (
			<div className='loading'>
				<div className='loading__inner'>
					<div className='spinner'></div>
					<span>Жүктөлүүдө...</span>
				</div>
			</div>
		);
	}

	if (error) {
		console.error('Error fetching tour:', error);
		return <div>Error loading tour data</div>;
	}
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>Часто задаваемые вопросы</h2>
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
			</div>
		</section>
	);
};

export default FAQ;
