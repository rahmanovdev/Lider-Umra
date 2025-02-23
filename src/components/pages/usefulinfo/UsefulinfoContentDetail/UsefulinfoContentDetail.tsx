'use client';
import React from 'react';
import scss from './UsefulinfoContentDetail.module.scss';
import { motion } from 'framer-motion';
import { useTimeLine } from '@/hooks/use-time-line';
import { useGetBlogByIdQuery } from '@/redux/api/blogs';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const UsefulinfoContentDetail = () => {
	const params = useParams();
	const { data: blog, isLoading } = useGetBlogByIdQuery(Number(params.id));

	const { containerRef, height, heightTransform, ref, activeSections } =
		useTimeLine();

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	return (
		<div className={`${scss.variables} ${scss.pageContainer}`}>
			<h4 className={scss.title}>{blog?.name}</h4>
			<div className={scss.wrapper} ref={containerRef}>
				<div ref={ref} className={scss.timelineContainer}>
					{blog?.desc_blogs.map((item, index) => (
						<div
							key={index}
							className={`${index === 0 && scss.isFirst} ${scss.timelineEntry}`}
						>
							<div data-timeline-mark className={scss.timelineMark}>
								<div
									className={`${scss.markCircleOuter} ${
										activeSections.includes(index) ? scss.active : ''
									}`}
								>
									{index + 1}
								</div>
							</div>
							<div className={scss.contentWrapper}>
								<div className={scss.content}>
									{item.image && (
										<div className={scss['img-card']}>
											<Image
												src={item.image}
												alt={`Detail ${index + 1}`}
												width={800}
												height={400}
												priority
											/>
										</div>
									)}
									<div dangerouslySetInnerHTML={{ __html: item.text }} />
								</div>
							</div>
						</div>
					))}
					<div style={{ height: height + 'px' }} className={scss.timelineLine}>
						<motion.div
							style={{ height: heightTransform }}
							className={scss.timelineProgress}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsefulinfoContentDetail;
