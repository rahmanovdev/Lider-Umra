'use client';
import React, { useEffect, useState } from 'react';

type Size = { width: number; height: number };

export function useSize(
	element: 'window' | 'body' | React.RefObject<HTMLElement> | string = 'window'
): Size {
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });

	const updateSize = React.useCallback(() => {
		let targetElement: HTMLElement | Window | Element | null = null;

		if (element === 'window') {
			targetElement = window;
		} else if (element === 'body') {
			targetElement = document.body;
		} else if (typeof element === 'string') {
			targetElement = document.querySelector(element);
		} else if (element && element.current) {
			targetElement = element.current;
		}

		if (targetElement instanceof Window) {
			setSize({
				width: targetElement.innerWidth,
				height: targetElement.innerHeight
			});
		} else if (targetElement instanceof HTMLElement) {
			setSize({
				width: targetElement.clientWidth,
				height: targetElement.clientHeight
			});
		}
	}, [element]);

	useEffect(() => {
		if (typeof window === 'undefined' || typeof document === 'undefined')
			return;
		updateSize();
		window.addEventListener('resize', updateSize);

		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, [element, updateSize]);

	return size;
}
