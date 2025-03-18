'use client';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import React from 'react';

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface IImageLightboxProps {
   images: string[];
   onClose: VoidFunction;
   selected: number;
}

const ImageLightbox: React.FC<IImageLightboxProps> = React.memo(
   ({ images, onClose, selected }) => {
      return (
         <Lightbox
            close={onClose}
            index={selected}
            open={true}
            slides={images.map(v => ({ src: v }))}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
         />
      );
   },
);

ImageLightbox.displayName = 'ImageLightbox';
export default ImageLightbox;
