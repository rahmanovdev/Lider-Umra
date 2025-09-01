'use client';
import ReactLightbox, { Render } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import React from 'react';

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { SlideImage } from 'yet-another-react-lightbox';

interface ILightboxProps {
   slides?: SlideImage[];
   onClose: VoidFunction;
   selected?: number;
   render?: Render;
}

const Lightbox: React.FC<ILightboxProps> = React.memo(
   ({ slides, onClose, selected, render }) => {
      return (
         <ReactLightbox
            render={render}
            close={onClose}
            index={selected}
            open={true}
            slides={slides}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
         />
      );
   },
);

Lightbox.displayName = 'Lightbox';
export default Lightbox;
