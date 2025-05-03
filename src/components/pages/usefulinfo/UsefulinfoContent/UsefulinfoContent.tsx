'use client';
import React from 'react';
import styles from './UsefulinfoContent.module.scss';
import Image from 'next/image';

const UseFullInfo = [
	[
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 2,
			image_src: '/assets/usefullinfo/image2.png'
		}
	],
	[
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 2,
			image_src: '/assets/usefullinfo/image2.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		}
	],
	[
		{
			title: 'Привет',
			content: 'Привет',
			fr: 2,
			image_src: '/assets/usefullinfo/image2.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		}
	],
	[
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 1,
			image_src: '/assets/usefullinfo/image1.png'
		}
	],
	[
		{
			title: 'Привет',
			content: 'Привет',
			fr: 2,
			image_src: '/assets/usefullinfo/image2.png'
		},
		{
			title: 'Привет',
			content: 'Привет',
			fr: 2,
			image_src: '/assets/usefullinfo/image2.png'
		}
	]
];

const UsefulinfoContent = () => {
	return (
		<div className={styles.use_full_info_content}>
			{UseFullInfo.map((row, rowIndex) => (
				<div className={styles.row} key={rowIndex}>
					{row.map((item, itemIndex) => (
						<div
							className={`${styles[`fr-${item.fr}`]} ${styles.item}`}
							key={itemIndex}
						>
							<Image
								src={item.image_src}
								alt='UseFullInfo Image'
								width={item.fr == 1 ? 375 : 790}
								height={420}
							/>
							<div className={styles['content']}>
								<h2>{item.title}</h2>
								<p>{item.content}</p>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default UsefulinfoContent;
