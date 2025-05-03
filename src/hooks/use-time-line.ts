'use client';

import { useScroll, useTransform } from 'framer-motion';
import React from 'react';

export const useTimeLine = () => {
	const ref = React.useRef<HTMLDivElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [height, setHeight] = React.useState(0);
	const [sectionOffsets, setSectionOffsets] = React.useState<number[]>([]);
	const [activeSections, setActiveSections] = React.useState<number[]>([]);

	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.scrollHeight);
		}
	}, [ref]);

	const updateOffsets = () => {
		if (ref.current) {
			const marks = Array.from(
				ref.current.querySelectorAll('[data-timeline-mark]')
			) as HTMLDivElement[];

			const offsets = marks.map(mark => mark.offsetTop);
			setSectionOffsets(offsets);
		}
	};

	React.useEffect(() => {
		updateOffsets();
		window.addEventListener('resize', updateOffsets);
		return () => window.removeEventListener('resize', updateOffsets);
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 20%', 'end 50%']
	});

	const maxHeight =
		sectionOffsets.length > 0 ? sectionOffsets[sectionOffsets.length - 1] : 0;

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, maxHeight]);

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
