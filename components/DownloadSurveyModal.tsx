import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: any;
  onLogin: () => void;
  isGenerating: boolean;
}

const DownloadSurveyModal: React.FC<ModalProps> = ({ 
  isOpen, onClose, onConfirm, user, onLogin, isGenerating 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Presentation</h2>
          <p className="text-slate-500 mb-8">Get the full strategy deck as a PDF file.</p>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-4">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600 mb-4"></div>
               <span className="text-brand-600 font-medium">Generating PDF...</span>
               <span className="text-xs text-gray-400 mt-1">This might take a few seconds</span>
            </div>
          ) : (
             <>
                {user ? (
                    <div className="space-y-4">
                        <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">
                            Logged in as {user.email}
                        </div>
                        {/* Optional Survey could go here */}
                        <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">How did you find us? (Optional)</label>
                            <select className="w-full p-2 border rounded bg-white">
                                <option>LinkedIn</option>
                                <option>Friend</option>
                                <option>Search</option>
                            </select>
                        </div>

                        <button 
                            onClick={onConfirm}
                            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition shadow-lg"
                        >
                            Download Now
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded border border-orange-100">
                           To prevent bot traffic, please sign in with Google to verify you are human.
                        </p>
                        <button 
                            onClick={onLogin}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl border border-gray-300 transition flex items-center justify-center space-x-2"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                )}
             </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadSurveyModal;