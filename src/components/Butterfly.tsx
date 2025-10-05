import { useState } from "react";

interface ButterflyProps {
  onClick: () => void;
}

export const Butterfly = ({ onClick }: ButterflyProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed z-40 cursor-pointer animate-fly-around"
      style={{
        left: "50%",
        top: "30%",
        animation: "fly-around 20s ease-in-out infinite"
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div 
          className={`text-6xl transition-transform duration-300 ${
            isHovered ? 'scale-125' : 'scale-100'
          }`}
          style={{
            filter: isHovered ? 'drop-shadow(0 0 10px rgba(255, 192, 203, 0.8))' : 'none'
          }}
        >
          🦋
        </div>
        
        {/* Hint tooltip */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            <span className="text-sm font-medium text-pink-600">Click me! 💕</span>
          </div>
        </div>
      </div>
    </div>
  );
};
