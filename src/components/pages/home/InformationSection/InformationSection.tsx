'use client';
import React from 'react';
import scss from './InformationSection.module.scss';
import Image from 'next/image';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import { useTranslations } from 'next-intl';
import Loading from '@/components/ui/loading/Loading';

const InformationSection = () => {
	const t = useTranslations();
	const { data, isLoading, error } = useGetBlogsQuery();

	return (
		<section className={scss.Main}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1>{t('information.title')}</h1>
					{isLoading ? (
						<Loading />
					) : error || !data ? (
						<div>{t('information.error')}</div>
					) : (
						<div className={scss.main_card}>
							{data.map((blog, idx) => (
								<div key={idx} className={scss.card}>
									<div className={scss.imageWrapper}>
										<Image
											src={blog.image}
											alt='Card Image'
											className={scss.image}
											width={700}
											height={300}
										/>
									</div>
									<div
										dangerouslySetInnerHTML={{ __html: blog.rich }}
										className={scss.textOverlay}
									></div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default InformationSection;
