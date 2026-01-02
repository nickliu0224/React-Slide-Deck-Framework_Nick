import React, { useState, useEffect, useCallback } from 'react';
import { Slide } from '../types';
import SlideContent from './SlideContent';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface SlideDeckProps {
  slides: Slide[];
  onDownloadPdf: () => void;
}

const SlideDeck: React.FC<SlideDeckProps> = ({ slides, onDownloadPdf }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  if (slides.length === 0) return <div className="p-10 text-center">Loading slides...</div>;

  return (
    <div className="relative w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      
      {/* Main Slide Container (Aspect Ratio 4:3 or 16:9 approx) */}
      <div className="w-full max-w-6xl aspect-video bg-white shadow-2xl rounded-sm overflow-hidden relative">
        <SlideContent slide={slides[currentIndex]} />
      </div>

      {/* Navigation Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
        <button 
          onClick={goToPrev} 
          className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={goToNext} 
          className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition ${currentIndex === slides.length - 1 ? 'opacity-0' : 'opacity-100'}`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
         <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {slides.length}
         </div>
         <button 
           onClick={onDownloadPdf}
           className="bg-brand-600 hover:bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg transition"
         >
            <Download className="w-4 h-4" />
            <span>PDF</span>
         </button>
      </div>
    </div>
  );
};

export default SlideDeck;