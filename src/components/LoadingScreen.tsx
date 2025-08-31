import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Sprinkling love dust... ✨",
    "Warming up the cuddles... 🤗",
    "Loading precious memories... 💕",
    "Almost ready for cuteness overload! 🥰"
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 750);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-love flex items-center justify-center overflow-hidden">
      {/* Floating hearts */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-cream opacity-70 animate-float-hearts"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="text-center z-10 px-8">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 animate-love-bounce">
            Love OS
          </h1>
          <div className="text-3xl mb-2">💕</div>
          <p className="text-xl text-love-cream opacity-90">
            Made with love for our 6 months ❤️
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/80 text-sm mt-2">{progress}%</div>
        </div>

        {/* Loading message */}
        <div className="h-8">
          <p className="text-lg text-white/90 animate-fade-in" key={currentMessage}>
            {messages[currentMessage]}
          </p>
        </div>
      </div>
    </div>
  );
};