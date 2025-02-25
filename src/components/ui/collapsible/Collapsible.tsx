'use client';

import clsx from 'clsx';
import styles from './Collapsible.module.scss';
import React from 'react';
import { CollapsibleProps } from './collapsible.types';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
const Collapsible: React.FC<CollapsibleProps> = ({
	disabled,
	className,
	children,
	trigger,
	value
}) => {
	return (
		<div
			suppressHydrationWarning
			className={clsx(className, styles.collapsible)}
		>
			{trigger && trigger}

			<AnimatePresence>
				{!disabled && value && (
					<>
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className={clsx(
								styles.collapsible_content,
								'collabsible_content'
							)}
						>
							{children}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Collapsible;
