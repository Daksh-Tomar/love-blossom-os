import { useEffect } from "react";

interface ConfettiPopupProps {
  onComplete: () => void;
}

export const ConfettiPopup = ({ onComplete }: ConfettiPopupProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const confettiPieces = [
    '🎉', '🎊', '💖', '💕', '❤️', '💗', '💝', '✨', '🌟', '💫', '🦋', '🌸', '🌺', '🌷'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Happy 6 Months text */}
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl animate-love-bounce mb-6 leading-tight">
          Happy 6 months of togetherness ❤️
        </h1>
        {/* Bubu & Dudu gif */}
        <div className="flex justify-center mt-4">
          <img 
            src="/src/assets/bubu-dudu.gif" 
            alt="Bubu & Dudu celebrating" 
            className="w-32 h-24 md:w-40 md:h-30 lg:w-48 lg:h-36 drop-shadow-2xl animate-bounce rounded-lg"
          />
        </div>
      </div>

      {/* Confetti animation */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            fontSize: `${20 + Math.random() * 20}px`
          }}
        >
          {confettiPieces[Math.floor(Math.random() * confettiPieces.length)]}
        </div>
      ))}
    </div>
  );
};