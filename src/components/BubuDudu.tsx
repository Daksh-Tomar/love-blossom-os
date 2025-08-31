import { useState } from "react";
import bubuDuduGif from "../assets/bubu-dudu.gif";

interface BubuDuduProps {
  onSpecialClick: () => void;
}

export const BubuDudu = ({ onSpecialClick }: BubuDuduProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const clickMessages = [
    "Click me! 💕",
    "Click again! 😊",
    "Keep going! 🥰", 
    "Almost there! 💖",
    "One more! 🎉",
    "Last click! ✨"
  ];

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (newCount === 6) {
      onSpecialClick();
      setClickCount(0);
    }
  };

  return (
    <div className="absolute bottom-20 right-8">
      <div
        className={`cursor-pointer transition-transform duration-300 ${
          isAnimating ? 'scale-110' : 'hover:scale-105'
        } heart-trail`}
        onClick={handleClick}
      >
        <img
          src={bubuDuduGif}
          alt="Bubu & Dudu"
          className="w-32 h-24 drop-shadow-lg animate-love-bounce"
        />
        
        {/* Cute click message */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
            {clickMessages[clickCount] || clickMessages[0]}
          </div>
        </div>
      </div>
      
      {/* Floating hearts on click */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-love-pink animate-float-hearts"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: '1s'
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}
    </div>
  );
};