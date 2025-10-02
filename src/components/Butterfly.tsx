import { useState } from "react";

interface ButterflyProps {
  onClick: () => void;
}

export const Butterfly = ({ onClick }: ButterflyProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed z-40 cursor-pointer"
      style={{
        left: "50%",
        top: "30%",
        animation: "fly-around 20s ease-in-out infinite"
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sparkle trail */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -left-2 text-2xl animate-ping">✨</div>
          <div className="absolute -top-3 left-8 text-xl animate-bounce" style={{ animationDelay: '0.1s' }}>💫</div>
          <div className="absolute top-6 -left-4 text-xl animate-pulse" style={{ animationDelay: '0.2s' }}>⭐</div>
        </>
      )}
      
      <div 
        className={`text-6xl transition-all duration-300 ${
          isHovered ? 'scale-150 animate-bounce' : 'scale-100'
        }`}
        style={{
          filter: isHovered ? 'drop-shadow(0 0 20px rgba(255, 192, 203, 1))' : 'drop-shadow(0 0 8px rgba(255, 192, 203, 0.5))',
          animation: isHovered ? 'flutter 0.3s ease-in-out infinite' : 'none'
        }}
      >
        🦋
      </div>
      
      {/* Floating hearts around butterfly */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xl animate-float-hearts" style={{ animationDelay: '0s' }}>💕</div>
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-lg animate-float-hearts" style={{ animationDelay: '0.5s' }}>💖</div>
    </div>
  );
};
