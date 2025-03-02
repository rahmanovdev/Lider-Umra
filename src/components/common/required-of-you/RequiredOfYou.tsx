'use client';
import React from 'react';
import styles from './RequiredOfYou.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaPassport, FaUserCircle } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { Assets } from '@/assets'

const RequiredOfYou: React.FC = () => {
	const t = useTranslations('aboutUs');

	const requireds_of_you = [
		{
			id: 'rf-1',
			title: t('requirements.passport.title'),
			description: t('requirements.passport.description'),
			Icon: FaPassport
		},
		{
			id: 'rf-2',
			title: t('requirements.marriage.title'),
			description: t('requirements.marriage.description'),
			Icon: FaPassport
		},
		{
			id: 'rf-3',
			title: t('requirements.photo.title'),
			description: t('requirements.photo.description'),
			Icon: FaUserCircle
		},
		{
			id: 'rf-4',
			title: t('requirements.escort.title'),
			description: t('requirements.escort.description'),
			Icon: FaUserGroup
		}
	];

	return (
		<div className={styles.required_of_you}>
			<div className={clsx(styles['container'], 'container')}>
				<div className={styles['content']}>
					<h4>{t('documents')}</h4>
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
				<figure data-figure className={styles.image}>
					<Image
						width={408}
						height={500}
						alt='adli wahid'
						src={Assets.Images.AdliWahid}
					/>
				</figure>
			</div>
		</div>
	);
};

export default RequiredOfYou;
