'use client';

import { useScroll, useTransform } from 'framer-motion';
import React from 'react';

export const useTimeLine = (is_max = false, depends?: React.DependencyList) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [height, setHeight] = React.useState(0);
	const [sectionOffsets, setSectionOffsets] = React.useState<number[]>([]);
	const [activeSections, setActiveSections] = React.useState<number[]>([]);

	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.scrollHeight);
		}
	}, [ref, depends]);

	const updateOffsets = React.useCallback(() => {
		if (ref.current) {
			const marks = Array.from(
				ref.current.querySelectorAll('[data-timeline-mark]')
			) as HTMLDivElement[];

			const offsets = marks.map(mark => mark.offsetTop);
			setSectionOffsets(offsets);
		}
	}, []);

	React.useEffect(() => {
		if (typeof window === 'undefined') return;
		updateOffsets();
		window.addEventListener('resize', updateOffsets);
		return () => window.removeEventListener('resize', updateOffsets);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateOffsets, depends?.[0]]);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: !is_max ? ['start', 'end'] : ['start 20%', 'end 50%']
	});

	const maxHeight =
		sectionOffsets.length > 0 ? sectionOffsets[sectionOffsets.length - 1] : 0;

	const heightTransform = useTransform(
		scrollYProgress,
		[0, 1],
		[0, is_max ? maxHeight : height]
	);

	React.useEffect(() => {
		return heightTransform.onChange(value => {
			const newActiveSections = sectionOffsets
				.map((offset, index) => (value >= offset ? index : -1))
				.filter(index => index !== -1);

			setActiveSections(newActiveSections);
		});
	}, [heightTransform, sectionOffsets, maxHeight]);

	return {
		heightTransform,
		height,
		ref,
		containerRef,
		activeSections
	};
};
