'use client';
import ReduxProvider from '@/providers/ReduxProvider';
import React, { FC } from 'react';

const RootProvider: FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <>
         <ReduxProvider>{children}</ReduxProvider>
      </>
   );
};

export default RootProvider;
