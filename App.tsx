import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase.config';
import SlideDeck from './components/SlideDeck';
import CMS from './components/CMS';
import PdfSlides from './components/PdfSlides';
import DownloadSurveyModal from './components/DownloadSurveyModal';
import { useContent } from './hooks/useContent';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Main App Component ---
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const { slides, loading, updateSlide, resetContent } = useContent(!!user); // Only enable writing if user exists (simple rule)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Login Handler
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. If you are in Incognito, try normal mode or enable third-party cookies.");
    }
  };

  // PDF Generation Logic
  const generatePdf = async () => {
    setIsGeneratingPdf(true);
    // Wait for a render cycle to ensure hidden div is ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const element = document.getElementById('pdf-root');
    if (!element) {
        alert("Error: PDF source not found");
        setIsGeneratingPdf(false);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // Higher quality
            useCORS: true,
            logging: false,
            windowWidth: 1200
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1200, 675] // Match slide aspect ratio
        });

        // The hidden div renders all slides vertically. We need to split them?
        // Actually, PdfSlides component renders them stacked. 
        // A better approach for multipage PDF with html2canvas is capturing children.
        
        const slideNodes = element.children;
        const pdfWidth = 1200;
        const pdfHeight = 675;
        
        // Re-initialize PDF to empty
        const finalPdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
        });

        for (let i = 0; i < slideNodes.length; i++) {
            const slideNode = slideNodes[i] as HTMLElement;
            const slideCanvas = await html2canvas(slideNode, { scale: 2, useCORS: true });
            const slideImg = slideCanvas.toDataURL('image/jpeg', 0.9);
            
            if (i > 0) finalPdf.addPage();
            finalPdf.addImage(slideImg, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        finalPdf.save('presentation-deck.pdf');
        setIsModalOpen(false);
    } catch (err) {
        console.error("PDF Gen Error:", err);
        alert("Failed to generate PDF.");
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  if (loading) {
      return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-400">Loading Framework...</div>;
  }

  return (
    <HashRouter>
      <div className="font-sans text-slate-900">
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <>
                <SlideDeck 
                    slides={slides} 
                    onDownloadPdf={() => setIsModalOpen(true)} 
                />
                {/* Hidden PDF Render Layer */}
                <div className="absolute top-0 left-0 overflow-hidden h-0 w-0 opacity-0 pointer-events-none">
                     <PdfSlides slides={slides} />
                </div>
            </>
          } />
          
          <Route path="/cms" element={
            user ? (
                <CMS 
                    slides={slides} 
                    onUpdate={updateSlide} 
                    onReset={resetContent}
                    user={user} 
                />
            ) : (
                <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">CMS Login Required</h1>
                    <button onClick={handleLogin} className="bg-brand-600 text-white px-6 py-3 rounded-lg shadow">
                        Sign in with Google
                    </button>
                </div>
            )
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Modal */}
        <DownloadSurveyModal 
            isOpen={isModalOpen}
            onClose={() => !isGeneratingPdf && setIsModalOpen(false)}
            onConfirm={generatePdf}
            user={user}
            onLogin={handleLogin}
            isGenerating={isGeneratingPdf}
        />
      </div>
    </HashRouter>
  );
};

export default App;