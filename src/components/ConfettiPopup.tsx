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
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Happy 6 Months text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-2xl animate-love-bounce mb-8">
          Happy 6 months of toghterness ❤️
        </h1>
        {/* Bubu & Dudu gif */}
        <div className="flex justify-center">
          <img 
            src="/src/assets/bubu-dudu.gif" 
            alt="Bubu & Dudu celebrating" 
            className="w-48 h-36 drop-shadow-2xl animate-bounce"
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