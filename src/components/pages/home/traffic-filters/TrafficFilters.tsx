'use client';
import React from 'react';
import styles from './TrafficFilters.module.scss';
import clsx from 'clsx';

const ValuesKey = {
	all: { value: 'Бардык программалар', desc: 'Бардык программалар' },
	february: {
		value: 'Февраль',
		desc: '1-февралдан 28-февралга чейинки умра сапарлары'
	},
	march: {
		value: 'Март',
		desc: '1-Марттан 31-мартка чейинки умра сапарлары'
	},
	april: {
		value: 'Апрель',
		desc: '1-Апрелден 30-апрелге чейинки умра сапарлары'
	}
};

interface TrafficFiltersProps {
	onFilterChange: (month: keyof typeof ValuesKey) => void;
}

const TrafficFilters: React.FC<TrafficFiltersProps> = ({ onFilterChange }) => {
	const [value, setValue] = React.useState<keyof typeof ValuesKey>('all');

	const handleClick = (key: keyof typeof ValuesKey) => {
		setValue(key);
		onFilterChange(key);
	};

	return (
		<div className={styles.traffic_filters}>
			<h1>Тарифы 2025-2026</h1>
			<div className={styles.container}>
				{Object.keys(ValuesKey).map(key => (
					<button
						key={key}
						onClick={() => handleClick(key as keyof typeof ValuesKey)}
						className={clsx({
							[styles.active]: value === key
						})}
					>
						{ValuesKey[key as keyof typeof ValuesKey].value}
					</button>
				))}
			</div>
		</div>
	);
};

export default TrafficFilters;
