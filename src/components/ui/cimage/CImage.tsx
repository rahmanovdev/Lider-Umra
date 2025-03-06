'use client';

import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import scss from './CImage.module.scss';
import Loading from '../loading/Loading';
import { MdError } from 'react-icons/md';

interface CImageProps
   extends Omit<ImageProps, 'onLoadingComplete' | 'onError'> {
   fallbackSrc?: string;
   loadingComponent?: React.ReactNode;
   errorComponent?: React.ReactNode;
   className?: string;
}

const CImage: React.FC<CImageProps> = ({
   src,
   alt,
   fallbackSrc = '/fallback.png',
   loadingComponent = <Loading />,
   errorComponent,
   className = '',
   width,
   height,
   ...rest
}) => {
   const [isLoading, setIsLoading] = useState(true);
   const [hasError, setHasError] = useState(false);

   const handleLoad = useCallback(() => {
      setIsLoading(false);
      setHasError(false);
   }, []);

   const handleError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
   }, []);

   const defaultErrorComponent = (
      <div className={`${scss.errorWrapper} ${className}`}>
         <MdError className={scss.errorIcon} />
         <span>Failed to load image</span>
      </div>
   );

   if (hasError) {
      return errorComponent ? (
         <>{errorComponent}</>
      ) : fallbackSrc ? (
         <Image
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            {...rest}
         />
      ) : (
         defaultErrorComponent
      );
   }

   return (
      <div data-wrapper='true' className={`${scss.imageWrapper} ${className}`}>
         {isLoading && (
            <div className={scss.loadingOverlay}>{loadingComponent}</div>
         )}
         <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoadingComplete={handleLoad}
            onError={handleError}
            className={`${scss.image} ${isLoading ? scss.loading : ''}`}
            {...rest}
         />
      </div>
   );
};

export default CImage;
