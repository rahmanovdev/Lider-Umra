'use client';
import React from 'react';
import scss from './GalleryContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx';
import { useGetGalleriesQuery } from '@/redux/api/gallery';
import { generateRows } from '@/utils/generate-rows.util';
import { useLocale } from 'next-intl';
import Loading from '@/components/ui/loading/Loading';
import ImageLightbox from '@/components/ui/image-lighbox/ImageLightbox';

const GalleryContent = () => {
	const { width: sizeWidth } = useSize();
	const { data = [], isLoading, isError } = useGetGalleriesQuery();
	const locale = useLocale();
	const [selected, setSelected] = React.useState<number | null>(null);

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
				<h4 className={scss.title}>
					{locale == 'kg' ? 'Сүрөт галереялары' : 'Фотогалереи'}
				</h4>
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
							Error loading gallery
						</motion.p>
					) : rows.length ? (
						<div key='gallery' className={gridClass}>
							{selected && (
									<ImageLightbox
										selected={selected}
										images={data.map(v => v.photo)}
										onClose={() => setSelected(null)}
									/>
							)}
							{rows.map((row, rowIndex) => (
								<React.Fragment key={rowIndex}>
									{row.map(item => (
										<div
											key={item.item.id}
											onClick={() => setSelected(item.fr)}
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
