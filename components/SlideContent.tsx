import React from 'react';
import { Slide } from '../types';
import { Target, CheckCircle, Image as ImageIcon, Heart, Bot, Share2 } from 'lucide-react';

interface SlideContentProps {
  slide: Slide;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  
  const renderIcon = (name?: string) => {
    switch(name) {
      case 'image': return <ImageIcon className="w-6 h-6 text-brand-600" />;
      case 'heart': return <Heart className="w-6 h-6 text-brand-600" />;
      case 'bot': return <Bot className="w-6 h-6 text-brand-600" />;
      default: return <CheckCircle className="w-6 h-6 text-brand-600" />;
    }
  };

  // Common footer renderer
  const Footer = () => (
    <div className="absolute bottom-0 left-0 w-full h-12 border-t border-gray-200 flex items-center justify-between px-8 text-gray-400 text-sm bg-white">
      <span>{slide.footer || 'Slide Deck'}</span>
      <span>{slide.id}</span>
    </div>
  );

  switch (slide.type) {
    case 'intro':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-white relative p-8">
          <div className="mb-8">
            <Target className="w-24 h-24 text-brand-600 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">{slide.title}</h1>
          <p className="text-2xl text-slate-600 mb-8">{slide.subtitle}</p>
          
          <div className="flex flex-col space-y-3 items-start text-left">
             {slide.items?.map(item => (
               <div key={item.id} className="flex items-center space-x-2 text-lg text-slate-600">
                  <CheckCircle className="w-5 h-5 text-brand-500" />
                  <span>{item.content}</span>
               </div>
             ))}
          </div>

          {slide.author && (
            <div className="mt-12 text-slate-400">
               Presented by {slide.author}
            </div>
          )}
          <Footer />
        </div>
      );

    case 'agenda':
      return (
        <div className="h-full bg-brand-50 relative p-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-12">{slide.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slide.items?.map((item, idx) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-brand-100 flex flex-col h-full">
                 <span className="text-4xl font-bold text-brand-100 mb-4">0{idx + 1}</span>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      );

    case 'concept':
      return (
        <div className="h-full bg-white relative p-12 flex flex-col">
          <div className="mb-8">
             {slide.subtitle && <p className="text-brand-600 font-semibold mb-2">{slide.subtitle}</p>}
             <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>

          {slide.content && (
             <div className="bg-brand-50 border-l-4 border-brand-500 p-6 rounded-r-lg mb-8">
                <p className="text-lg text-slate-700 whitespace-pre-line font-medium leading-relaxed">
                  {slide.content}
                </p>
             </div>
          )}

          {slide.image && (
             <div className="w-full h-32 bg-slate-100 rounded-lg mb-6 flex items-center justify-center text-slate-400">
                {/* Normally an <img /> tag here. Using div for safety if url is bad */}
                <span className="text-xs">Image Placeholder: {slide.image}</span>
             </div>
          )}

          <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
             {slide.items?.map((item) => (
               <div key={item.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                    {item.icon ? renderIcon(item.icon) : (item.title || '•')}
                  </div>
                  <div className="flex-1">
                     {item.title && !item.icon && <h4 className="font-bold text-slate-800">{item.title}</h4>}
                     {item.title && item.icon && <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>}
                     <p className="text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
               </div>
             ))}
          </div>
          <Footer />
        </div>
      );

    case 'resource':
      return (
        <div className="h-full bg-white relative p-12 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-12">{slide.title}</h2>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-md w-full">
            <div className="w-48 h-48 bg-slate-900 mx-auto mb-6 rounded-lg flex items-center justify-center text-white">
               <Share2 className="w-12 h-12" />
               {/* QR Code would go here */}
            </div>
            {slide.items?.map(item => (
               <div key={item.id} className="mb-4">
                 <h3 className="font-bold text-xl text-slate-800">{item.title}</h3>
                 <p className="text-brand-600 text-sm break-all">{item.content}</p>
               </div>
            ))}
          </div>
          <Footer />
        </div>
      );

    case 'outro':
      return (
        <div className="h-full bg-white relative p-12 flex flex-col">
            {slide.subtitle && <p className="text-brand-600 font-semibold mb-2">{slide.subtitle}</p>}
            <h2 className="text-4xl font-bold text-slate-800 mb-8">{slide.title}</h2>
            
            <div className="space-y-6 flex-1">
                {slide.items?.map(item => (
                    <div key={item.id} className="flex items-start space-x-3 text-xl text-slate-700">
                        <span className="text-brand-500">•</span>
                        <span>{item.content}</span>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
      );

    default:
      return <div>Unknown Slide Type</div>;
  }
};

export default SlideContent;