import Image from 'next/image';
import styles from './PlaceCard.module.scss';
import { Package } from '@/redux/api/tour-details/types';

interface PlaceCardProps {
	place: Package.Place;
	onOpen: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onOpen }) => {
	// HTML тегдерди тазалоо функциясы
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
				<Image
					src={place.image}
					alt={place.title}
					width={400}
					height={250}
					priority
				/>
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
