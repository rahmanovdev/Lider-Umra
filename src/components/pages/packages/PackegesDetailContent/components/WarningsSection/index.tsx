'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useGetWarningsQuery } from '@/redux/api/tour-details'

export const WarningsSection: React.FC = () => {
	const { data: warnings, isLoading } = useGetWarningsQuery('Restrictions');

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!warnings || warnings.length === 0) {
		return <div>Эскертүүлөр табылган жок</div>;
	}

	return (
		<div className={styles.warningsContent}>
			<h1>Көңүл буруңуз!</h1>
			<div className={styles.warningsList}>
				{warnings.map(warning => (
					<div key={warning.id} className={styles.warningItem}>
						<div className={styles.warningImageWrapper}>
							<Image
								src={warning.image}
								alt={warning.title}
								width={300}
								height={200}
							/>
						</div>
						<div className={styles.warningInfo}>
							<h3>{warning.title}</h3>
							<p>{warning.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
