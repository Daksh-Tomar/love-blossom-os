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
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-6xl font-bold text-white drop-shadow-2xl animate-love-bounce text-center">
          Happy 6 Months ❤️
        </h1>
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