import { useState } from "react";
import { BookHeart, Download, ZoomIn, ZoomOut, RotateCw, Heart, Sparkles } from "lucide-react";

export const OurStoryApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  
  // Our story PDF file
  const pdfUrl = "/our-story.pdf";
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '✨' : '💖'}
          </div>
        ))}
      </div>

      {/* Header with cute title */}
      <div className="relative z-10 bg-gradient-to-r from-pink-300/80 to-rose-300/80 backdrop-blur-sm p-6 border-b border-pink-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookHeart className="w-8 h-8 text-rose-600 animate-pulse" />
              <Sparkles className="w-4 h-4 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-rose-800 flex items-center gap-2">
                Our Beautiful Story
                <Heart className="w-6 h-6 text-red-500 animate-bounce" fill="currentColor" />
              </h2>
              <p className="text-rose-600 text-sm font-medium">Every chapter filled with love 💕</p>
            </div>
          </div>
          
          {/* Cute controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/70 rounded-full px-3 py-1 shadow-soft">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-pink-200/50 rounded-full transition-colors"
                disabled={zoom <= 50}
              >
                <ZoomOut className="w-4 h-4 text-rose-600" />
              </button>
              
              <span className="text-sm font-medium text-rose-800 px-2">
                {zoom}%
              </span>
              
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-pink-200/50 rounded-full transition-colors"
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4 text-rose-600" />
              </button>
            </div>
            
            <button className="p-2 bg-white/70 hover:bg-pink-200/50 rounded-full transition-colors shadow-soft">
              <RotateCw className="w-4 h-4 text-rose-600" />
            </button>
            
            <a 
              href={pdfUrl}
              download="our-story.pdf"
              className="p-2 bg-white/70 hover:bg-pink-200/50 rounded-full transition-colors shadow-soft"
            >
              <Download className="w-4 h-4 text-rose-600" />
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-pink-200/50 overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-3xl"></div>
          
          {/* PDF Container */}
          <div className="relative h-full p-2">
            <div 
              className="h-full w-full bg-white rounded-2xl shadow-inner overflow-hidden border-2 border-pink-100"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            >
              <iframe
                src={pdfUrl}
                className="w-full h-full rounded-2xl"
                title="Our Story PDF"
              />
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-2xl animate-spin-slow">🌸</div>
          <div className="absolute top-4 right-4 text-2xl animate-pulse">💝</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-bounce">🦋</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-pulse">✨</div>
        </div>
      </div>

      {/* Bottom cute message */}
      <div className="relative z-10 text-center p-4 bg-gradient-to-r from-pink-200/60 to-rose-200/60 backdrop-blur-sm">
        <p className="text-rose-700 font-medium flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-current animate-pulse" />
          Made with infinite love and countless precious moments
          <Heart className="w-4 h-4 fill-current animate-pulse" />
        </p>
      </div>
    </div>
  );
};