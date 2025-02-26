'use client';
import React from 'react';
import scss from './InformationSection.module.scss';
import Image from 'next/image';
import { useGetBlogsQuery } from '@/redux/api/blogs';

const InformationSection = () => {
	const { data, isLoading, error } = useGetBlogsQuery();
	return (
		<section className={scss.Main}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1>Полезные информации</h1>
					<div className={scss.main_card}>
						{isLoading ? (
							<div>Жүктөлүүдө...</div>
						) : error || !data ? (
							<div>
								Маалыматтарды жүктөөдө ката кетти. Кайра аракет кылыңыз.
							</div>
						) : (
							data.map((blog, idx) => (
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
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default InformationSection;
