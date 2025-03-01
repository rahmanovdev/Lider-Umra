'use client';

import { useEffect } from 'react';

export const useClickAway = (
   callback: VoidFunction,
   ref: React.RefObject<HTMLElement | null>,
) => {
   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
         }
      };

      document.addEventListener('mousedown', handleClick);
      return () => {
         document.removeEventListener('mousedown', handleClick);
      };
   }, [callback, ref]);
};
