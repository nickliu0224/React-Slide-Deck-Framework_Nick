import React, { useState } from 'react';
import { Slide } from '../types';
import { Save, RefreshCw, LogOut } from 'lucide-react';
import SlideContent from './SlideContent';
import { auth } from '../firebase.config';

interface CMSProps {
  slides: Slide[];
  onUpdate: (slide: Slide) => void;
  onReset: () => void;
  user: any;
}

const CMS: React.FC<CMSProps> = ({ slides, onUpdate, onReset, user }) => {
  const [selectedSlideId, setSelectedSlideId] = useState<string>(slides[0]?.id || '');
  
  const selectedSlide = slides.find(s => s.id === selectedSlideId);

  const handleTextChange = (field: keyof Slide, value: string) => {
    if (!selectedSlide) return;
    const updated = { ...selectedSlide, [field]: value };
    onUpdate(updated);
  };

  const handleItemChange = (itemId: string, field: string, value: string) => {
      if (!selectedSlide || !selectedSlide.items) return;
      const newItems = selectedSlide.items.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
      );
      onUpdate({ ...selectedSlide, items: newItems });
  };

  if (!user) return <div className="p-8 text-center">Access Denied</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-10">
         <h1 className="text-xl font-bold">Slide Deck CMS</h1>
         <div className="flex items-center space-x-4">
             <span className="text-sm text-gray-400">{user.email}</span>
             <button onClick={onReset} className="flex items-center space-x-1 text-red-400 hover:text-red-300 text-sm">
                <RefreshCw className="w-4 h-4" />
                <span>Reset Default</span>
             </button>
             <button onClick={() => auth.signOut()} className="text-sm hover:text-white">
                <LogOut className="w-4 h-4" />
             </button>
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-64 bg-white border-r overflow-y-auto p-4 space-y-2">
            {slides.map(slide => (
                <button
                    key={slide.id}
                    onClick={() => setSelectedSlideId(slide.id)}
                    className={`w-full text-left p-3 rounded text-sm font-medium transition ${selectedSlideId === slide.id ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                    <div className="truncate">{slide.title || slide.id}</div>
                    <div className="text-xs text-gray-400 uppercase mt-1">{slide.type}</div>
                </button>
            ))}
        </div>

        {/* Editor Area */}
        <div className="w-96 bg-gray-50 border-r overflow-y-auto p-6 shadow-inner">
            {selectedSlide ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                        <input 
                            type="text" 
                            value={selectedSlide.title} 
                            onChange={(e) => handleTextChange('title', e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                    </div>
                    {selectedSlide.subtitle !== undefined && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subtitle</label>
                            <input 
                                type="text" 
                                value={selectedSlide.subtitle} 
                                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                        </div>
                    )}
                    {selectedSlide.content !== undefined && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Content / Quote</label>
                            <textarea 
                                rows={4}
                                value={selectedSlide.content} 
                                onChange={(e) => handleTextChange('content', e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                            />
                        </div>
                    )}
                    
                    {/* List Items Editor */}
                    {selectedSlide.items && (
                        <div className="pt-4 border-t">
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-3">List Items</label>
                             <div className="space-y-4">
                                 {selectedSlide.items.map((item, idx) => (
                                     <div key={item.id} className="bg-white p-3 rounded border shadow-sm">
                                         <span className="text-xs text-gray-400 mb-1 block">Item {idx + 1}</span>
                                         {item.title !== undefined && (
                                             <input 
                                                className="w-full p-1 border-b mb-2 text-sm" 
                                                value={item.title} 
                                                onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                                                placeholder="Title"
                                             />
                                         )}
                                         <textarea 
                                            className="w-full p-1 border rounded text-xs bg-gray-50"
                                            value={item.content}
                                            onChange={(e) => handleItemChange(item.id, 'content', e.target.value)}
                                            placeholder="Content"
                                         />
                                     </div>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-400 mt-20">Select a slide to edit</div>
            )}
        </div>

        {/* Live Preview */}
        <div className="flex-1 bg-slate-200 flex items-center justify-center p-8 overflow-hidden">
             <div className="w-full max-w-4xl aspect-video bg-white shadow-xl rounded overflow-hidden transform scale-90">
                {selectedSlide && <SlideContent slide={selectedSlide} />}
             </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;