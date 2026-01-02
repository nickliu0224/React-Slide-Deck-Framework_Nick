import React from 'react';
import { Slide } from '../types';
import SlideContent from './SlideContent';

interface PdfSlidesProps {
  slides: Slide[];
}

const PdfSlides: React.FC<PdfSlidesProps> = ({ slides }) => {
  return (
    <div id="pdf-root" className="absolute top-0 left-0 z-[-1] w-[1200px]">
      {slides.map((slide) => (
        <div key={slide.id} className="w-[1200px] h-[675px] bg-white overflow-hidden mb-0 relative page-break-after-always">
             {/* We wrap SlideContent to ensure styles apply correctly in the capture context */}
             <SlideContent slide={slide} />
        </div>
      ))}
    </div>
  );
};

export default PdfSlides;