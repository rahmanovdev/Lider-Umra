import Image from 'next/image';
import styles from './PlaceCard.module.scss';
import { Place } from '../../types';

const PlaceCard = ({
	place,
	onOpen
}: {
	place: Place;
	onOpen: VoidFunction;
}) => {
	return (
		<div className={styles.placeCard}>
			<div className={styles.imageWrapper}>
				<Image
					src={place.image} // assuming place.image exists
					alt={place.title}
					width={400}
					height={250}
				/>
			</div>
			<div className={styles.placeInfo}>
				<h3>{place.title}</h3>
				<div className={styles.description}>
					{place.shortDescription}
					<button className={styles.readMore} onClick={onOpen}>
						...читать дальше
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlaceCard;
