'use client';
import React from 'react';
import scss from './GalleryContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx';
import { useGetGalleriesQuery } from '@/redux/api/gallery';
import { generateRows } from '@/utils/generate-rows.util';

const GalleryContent = () => {
	const { width: sizeWidth } = useSize();
	const { data = [], isLoading, isError } = useGetGalleriesQuery();

	const rows = generateRows(data, sizeWidth || 0);
	const totalItems = data.length;

	const gridClass = clsx(
		scss.grid,
		totalItems === 1 && scss['one-item'],
		totalItems === 2 && scss['two-items']
	);

	return (
		<motion.div
			className={scss.GalleryContent}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
		>
			<div className={clsx(scss.content, 'container')}>
				<h4 className={scss.title}>Фотогалерея</h4>
				<AnimatePresence mode='wait'>
					{isLoading ? (
						<motion.p
							key='loading'
							className={scss.loading}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							Loading...
						</motion.p>
					) : isError ? (
						<motion.p
							key='error'
							className={scss.error}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							Error loading gallery
						</motion.p>
					) : rows.length ? (
						<div key='gallery' className={gridClass}>
							{rows.map((row, rowIndex) => (
								<React.Fragment key={rowIndex}>
									{row.map(item => (
										<div
											key={item.item.id}
											className={clsx(scss.item, scss[`fr-${item.fr}`])}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={item.item.photo}
												alt={item.item.photo || 'Gallery image'}
												loading='lazy'
											/>
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
							No photos available
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default GalleryContent;
