import React from 'react';
import styles from './RequiredOfYou.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { FaPassport, FaUserCircle } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

const RequiredOfYou: React.FC = () => {
	return (
		<div className={styles.required_of_you}>
			<div className={clsx(styles['container'], 'container')}>
				<div className={styles['content']}>
					<h4>Необходимые документы для подачи</h4>
					<div className={styles['blocks']}>
						{requireds_of_you.map(({ Icon, ...rf }) => (
							<div className={styles.block} key={rf.id}>
								<figure>
									<Icon size={60} />
								</figure>
								<h5>{rf.title}</h5>
								<p>{rf.description}</p>
							</div>
						))}
					</div>
				</div>
				<figure className={styles.image}>
					<Image
						width={408}
						height={500}
						alt='adli wahid'
						src='/assets/images/adli-wahid.jpg'
					/>
				</figure>
			</div>
		</div>
	);
};

const requireds_of_you = [
	{
		id: 'rf-1',
		title: 'Заграничный паспорт',
		description:
			'Заграничный паспорт, ID карта. Не менее 6 месяцев до окончания срока действия.',
		Icon: FaPassport
	},
	{
		id: 'rf-2',
		title: 'Свидетельство о браке',
		description: 'Супругам нужно иметь свидетельство о браке (подлинник).',
		Icon: FaPassport
	},
	{
		id: 'rf-3',
		title: 'Фото',
		description:
			'4 цветные фотографии 3*4 на белом фоне (женщина в черном платке на белом фоне).',
		Icon: FaUserCircle
	},
	{
		id: 'rf-4',
		title: 'Сопровождение',
		description: 'Женщина должна сопровождаться махрамом старше 21 года.',
		Icon: FaUserGroup
	}
];

export default RequiredOfYou;
