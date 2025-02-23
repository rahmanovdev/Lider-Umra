'use client';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UsefulinfoContent.module.scss';
import { useSize } from '@/hooks/use-size';

interface LayoutItem {
	fr: number;
	blog: BLOG.Blog;
}
const UsefulinfoContent = () => {
	const { data: blogs, isLoading } = useGetBlogsQuery();
	const size = useSize();
	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!blogs || blogs.length === 0) {
		return <div>Маалымат табылган жок</div>;
	}

	const generateRows = (blogs: BLOG.GetBlogsResponse) => {
		const rows: LayoutItem[][] = [];
		let index = 0;

		const layouts =
			size.width <= 1090
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
					const blog = blogs[index];
					index++;
					return blog ? { ...item, blog } : null;
				})
				.filter(Boolean) as LayoutItem[];
			if (row.length) rows.push(row);
		});

		while (index < blogs.length) {
			const remainingRow = [
				{ fr: 2, blog: blogs[index] },
				blogs[index + 1] ? { fr: 2, blog: blogs[index + 1] } : null
			].filter(Boolean) as LayoutItem[];
			rows.push(remainingRow);
			index += 2;
		}

		return rows;
	};

	const rows = generateRows(blogs);
	return (
		<div className={styles.use_full_info_content}>
			{rows.map((row, rowIndex) => (
				<div className={styles.row} key={rowIndex}>
					{row.map(item => (
						<Link href={`/usefulinfo/${item.blog.id}`} key={item.blog.id}>
							<div
								className={`${styles['fr-' + item.fr]} ${
									row.length == 1 && styles.is_one
								} ${styles.item}`}
							>
								<Image
									src={item.blog.image || '/images/placeholder.jpg'}
									alt={item.blog.name}
									width={375}
									height={420}
									priority
								/>
								<div className={styles.content}>
									<h2>{item.blog.name}</h2>
									<div
										className={styles.description}
										dangerouslySetInnerHTML={{ __html: item.blog.rich }}
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			))}
		</div>
	);
};

export default UsefulinfoContent;
