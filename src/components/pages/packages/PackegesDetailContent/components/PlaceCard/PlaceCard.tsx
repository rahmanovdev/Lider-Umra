import Image from 'next/image';
import styles from './PlaceCard.module.scss';
import { Package } from '@/redux/api/tour-details/types';

interface PlaceCardProps {
	place: Package.Place;
	onOpen: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onOpen }) => {
	const stripHtml = (html: string) => {
		if (typeof document === 'undefined') return '';

		const temp = document.createElement('div');
		temp.innerHTML = html;
		return temp.textContent || temp.innerText;
	};

	const plainText = stripHtml(place.description);
	const shouldShowReadMore = plainText.length > 150;
	const truncatedText = shouldShowReadMore
		? plainText.slice(0, 150) + '...'
		: plainText;

	return (
		<div className={styles.placeCard}>
			<div className={styles.imageWrapper}>
				{place.image && place.image.trim() !== '' ? (
					<Image
						src={place.image}
						alt={place.title}
						width={400}
						height={250}
						priority
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // Add sizes prop
					/>
				) : (
					<div>No image available</div>
				)}
			</div>
			<div className={styles.placeInfo}>
				<h3>{place.title}</h3>
				<div className={styles.description}>
					{truncatedText}
					{shouldShowReadMore && (
						<button className={styles.readMore} onClick={onOpen}>
							толугураак
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlaceCard;
