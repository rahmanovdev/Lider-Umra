'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { useGetGiftsQuery } from '@/redux/api/tour-details'
import { Package } from '@/redux/api/tour-details/types'

export const GiftsSection: React.FC = () => {
	const [selectedGift, setSelectedGift] = useState<Package.Gift | null>(null);
	const { data: gifts, isLoading } = useGetGiftsQuery('YouGet');

	const handleReadMore = (gift: Package.Gift) => {
		setSelectedGift(gift);
	};

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!gifts || gifts.length === 0) {
		return <div>Белектер табылган жок</div>;
	}

	return (
		<>
			<div className={styles.giftsContent}>
				<h1>Сизге берилүүчү белектер</h1>
				<div className={styles.giftsList}>
					{gifts.map(gift => (
						<div key={gift.id} className={styles.giftCard}>
							<div className={styles.giftImageWrapper}>
								<Image
									src={gift.image}
									alt={gift.title}
									fill
									priority
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							</div>
							<div className={styles.giftInfo}>
								<h3>{gift.title}</h3>
								<p>
									{gift.shortDescription.length > 50 ? (
										<>
											{gift.shortDescription.slice(0, 50)}...
											<button
												className={styles.readMore}
												onClick={() => handleReadMore(gift)}
											>
												толугураак
											</button>
										</>
									) : (
										gift.shortDescription
									)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedGift && (
				<Modal
					isOpen={!!selectedGift}
					onClose={() => setSelectedGift(null)}
					title={selectedGift.title}
					content={selectedGift.description}
				/>
			)}
		</>
	);
};

export default GiftsSection;
