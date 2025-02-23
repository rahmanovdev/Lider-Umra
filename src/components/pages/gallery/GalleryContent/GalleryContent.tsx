'use client';
import React, { useState } from 'react';
import scss from './GalleryContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx'

const galleryItems = [
	{
		id: 1,
		type: 'image',
		src: 'https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?q=80&w=1375&auto=format&fit=crop',
		alt: 'Snowy mountain peak'
	},
	{
		id: 2,
		type: 'video',
		src: 'https://v.ftcdn.net/04/15/69/72/700_F_415697290_zBlJFddKioqUgBBlebfKHHd9QQNJadQQ_ST.mp4',
		alt: 'Waterfall in forest'
	},
	{
		id: 3,
		type: 'image',
		src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1350&auto=format&fit=crop',
		alt: 'Green forest'
	},
	{
		id: 4,
		type: 'video',
		src: 'https://v.ftcdn.net/04/15/69/72/700_F_415697290_zBlJFddKioqUgBBlebfKHHd9QQNJadQQ_ST.mp4',
		alt: 'Ocean waves'
	},
	{
		id: 5,
		type: 'image',
		src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
		alt: 'Ocean dusk'
	}
];

interface LayoutItem {
	fr: number;
	item: (typeof galleryItems)[0];
}

const generateRows = (items: typeof galleryItems, width: number) => {
	const rows: LayoutItem[][] = [];
	let index = 0;

	const layouts =
		width <= 1090
			? [
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }]
			  ]
			: [
					[{ fr: 1 }, { fr: 1 }, { fr: 2 }],
					[{ fr: 1 }, { fr: 2 }, { fr: 1 }],
					[{ fr: 2 }, { fr: 1 }, { fr: 1 }],
					[{ fr: 1 }, { fr: 1 }, { fr: 1 }, { fr: 1 }],
					[{ fr: 2 }, { fr: 2 }]
			  ];

	layouts.forEach(layout => {
		const row = layout
			.map(item => {
				const _item = items[index];
				index++;
				return _item ? { ...item, item: _item } : null; // Проверяем наличие _item
			})
			.filter(Boolean) as LayoutItem[];
		if (row.length) rows.push(row);
	});

	while (index < items.length) {
		const remainingRow = [
			{ fr: 2, item: items[index] },
			items[index + 1] ? { fr: 2, item: items[index + 1] } : null
		].filter(Boolean) as LayoutItem[];
		rows.push(remainingRow);
		index += 2;
	}

	return rows;
};

const GalleryContent = () => {
	const [activeTab, setActiveTab] = useState('all');
	const { width: sizeWidth } = useSize();
	const rows = generateRows(galleryItems, sizeWidth || 0);

	const filteredRows = rows
		.map(row =>
			row.filter(
				item =>
					activeTab === 'all' ||
					(item.item &&
						activeTab === (item.item.type === 'image' ? 'gallery' : 'video'))
			)
		)
		.filter(row => row.length > 0);

	const gridVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
		hover: { scale: 1.02, transition: { duration: 0.3 } }
	};

	return (
		<motion.div
			className={scss.GalleryContent}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className='container'>
				<motion.div
					className={scss.tabs}
					initial='hidden'
					animate='visible'
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
					}}
				>
					{['all', 'video', 'gallery'].map(tab => (
						<motion.button
							key={tab}
							className={`${scss.tab} ${activeTab === tab ? scss.active : ''}`}
							onClick={() => setActiveTab(tab)}
							variants={{
								hidden: { opacity: 0, y: -10 },
								visible: { opacity: 1, y: 0 }
							}}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</motion.button>
					))}
				</motion.div>

				<div className={scss.content}>
					<AnimatePresence mode='wait'>
						{filteredRows.length ? (
							<motion.div
								key={activeTab}
								className={scss.grid}
								variants={gridVariants}
								initial='hidden'
								animate='visible'
								exit={{ opacity: 0, transition: { duration: 0.3 } }}
							>
								{filteredRows.map((row, rowIndex) => (
									<React.Fragment key={rowIndex}>
										{row.map((item, idx) => (
											<motion.div
												key={item.item.id}
												className={clsx(scss.item, scss[`fr-${item.fr}`])}
												variants={itemVariants}
												initial='hidden'
												animate='visible'
												whileHover='hover'
												transition={{
													duration: 0.5,
													delay: rowIndex * 0.1 + idx * 0.05
												}}
											>
												{item.item.type === 'image' ? (
													<motion.img
														src={item.item.src}
														alt={item.item.alt}
														loading='lazy'
														whileHover={{ scale: 1.05 }}
														transition={{ duration: 0.3 }}
													/>
												) : (
													<motion.video
														controls
														muted
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.5 }}
														whileHover={{ scale: 1.05 }}
													>
														<source src={item.item.src} type='video/mp4' />
													</motion.video>
												)}
											</motion.div>
										))}
									</React.Fragment>
								))}
							</motion.div>
						) : (
							<motion.p
								key='no-items'
								className={scss.noItems}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.4 }}
							>
								Нет элементов
							</motion.p>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

export default GalleryContent;
