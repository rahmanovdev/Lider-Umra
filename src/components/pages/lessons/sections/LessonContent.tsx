'use client';
import React from 'react';
import scss from './LessonsContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx';
import { generateRows } from '@/utils/generate-rows.util';
import { useGetLessonsQuery } from '@/redux/api/lessons';
import Loading from '@/components/ui/loading/Loading';
import { useLocale } from 'next-intl';

const getYouTubeEmbedUrl = (url: string) => {
	const videoIdMatch = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/
	);
	const videoId = videoIdMatch ? videoIdMatch[1] : null;
	return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const LessonsContent: React.FC = () => {
	const { width: sizeWidth } = useSize();
	const { data = [], isLoading, isError } = useGetLessonsQuery();
	const locale = useLocale();
	const rows = generateRows(data, sizeWidth || 0);
	const totalItems = data.length;

	const gridClass = clsx(
		scss.grid,
		totalItems === 1 && scss['one-item'],
		totalItems === 2 && scss['two-items']
	);

	return (
		<motion.div
			className={scss.LessonsContent}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
		>
			<div className={clsx(scss.content, 'container')}>
				<h4 className={scss.title}>{locale === 'ru' ? 'Видео уроки' : 'Видео сабактар'}</h4>
				<AnimatePresence mode='wait'>
					{isLoading ? (
						<Loading />
					) : isError ? (
						<motion.p
							key='error'
							className={scss.error}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							Видео сабактарды жүктөөдө ката кетти
						</motion.p>
					) : rows.length ? (
						<div key='videos' className={gridClass}>
							{rows.map((row, rowIndex) => (
								<React.Fragment key={rowIndex}>
									{row.map(item => (
										<div
											key={item.item.id}
											className={clsx(scss.item, scss[`fr-${item.fr}`])}
										>
											<iframe
												src={getYouTubeEmbedUrl(item.item.video_url)}
												title={item.item.title}
												className={scss.video}
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen
											/>
											<p className={scss.videoTitle}>{item.item.title}</p>
										</div>
									))}
								</React.Fragment>
							))}
						</div>
					) : (
						<motion.p
							key='no-items'
							className={scss.noItems}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							Видео сабактар жок
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default LessonsContent;
