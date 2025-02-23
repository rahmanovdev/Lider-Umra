'use client';
import { useGetGiftsQuery } from '@/redux/api/tour-details';
import { Package } from '@/redux/api/tour-details/types';
import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import styles from './styles.module.scss';

export const GiftsSection: React.FC = () => {
	const [selectedGift, setSelectedGift] = useState<Package.Gift | null>(null);
	const { data: gifts, isLoading } = useGetGiftsQuery('YouGet');

	const handleReadMore = (gift: Package.Gift) => {
		setSelectedGift(gift);
	};

	const stripHtml = (html: string) => {
		if (typeof document === 'undefined') return '';

		const temp = document.createElement('div');
		temp.innerHTML = html;
		return temp.textContent || temp.innerText;
	};

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!gifts || gifts.length === 0) {
		return <div>Белектер табылган жок</div>;
	}

	const validGifts = gifts.filter(
		gift => gift.image && gift.image.trim() !== ''
	);

	return (
		<>
			<div className={styles.giftsContent}>
				<h1>Сизге берилүүчү белектер</h1>
				<div className={styles.giftsList}>
					{validGifts.map(gift => {
						// HTML тегдерсиз текст алуу
						const plainText = stripHtml(gift.description);
						const shouldShowReadMore = plainText.length > 100;

						return (
							<div key={gift.id} className={styles.giftCard}>
								<div className={styles.giftImageWrapper}>
									<Image
										src={gift.image || '/images/gift-placeholder.jpg'}
										alt={gift.title || 'Белек сүрөтү'}
										fill
										priority
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								</div>
								<div className={styles.giftInfo}>
									<h3>{gift.title}</h3>
									<div className={styles.description}>
										<div
											className={styles.shortDescription}
											dangerouslySetInnerHTML={{
												__html: shouldShowReadMore
													? gift.description.slice(0, 117) + '...'
													: gift.description
											}}
										/>
										{shouldShowReadMore && (
											<button
												className={styles.readMore}
												onClick={() => handleReadMore(gift)}
											>
												толугураак
											</button>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{selectedGift && (
				<Modal
					isOpen={!!selectedGift}
					onClose={() => setSelectedGift(null)}
					title={selectedGift.title}
					content={
						<div
							dangerouslySetInnerHTML={{ __html: selectedGift.description }}
						/>
					}
				/>
			)}
		</>
	);
};

export default GiftsSection;
