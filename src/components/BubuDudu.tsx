import { useState, useEffect } from "react";
import cuteDuduClick from "../assets/cute-dudu-click.png";
import bubuKiss from "../assets/bubu-kiss.png";
import duduHearts from "../assets/dudu-hearts.png";

interface BubuDuduProps {
  onSpecialClick: () => void;
}

export const BubuDudu = ({ onSpecialClick }: BubuDuduProps) => {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'kiss' | 'heart-growing' | 'heart-burst' | 'anniversary' | 'completed'>('initial');
  const [heartScale, setHeartScale] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  const handleClick = () => {
    if (animationPhase === 'initial') {
      // Start the animation sequence
      setAnimationPhase('kiss');
      
      // After kiss animation, show growing heart
      setTimeout(() => {
        setAnimationPhase('heart-growing');
        
        // Grow the heart over 2 seconds
        const growInterval = setInterval(() => {
          setHeartScale(prev => {
            if (prev >= 3) {
              clearInterval(growInterval);
              // Heart bursts
              setAnimationPhase('heart-burst');
              
              // Create floating hearts everywhere
              const hearts = Array.from({length: 30}, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                delay: i * 0.1
              }));
              setFloatingHearts(hearts);
              
              // Show anniversary message
              setTimeout(() => {
                setAnimationPhase('anniversary');
                
                // Complete sequence and trigger parent callback
                setTimeout(() => {
                  setAnimationPhase('completed');
                  onSpecialClick();
                }, 3000);
              }, 1000);
              
              return prev;
            }
            return prev + 0.1;
          });
        }, 50);
      }, 1500);
    }
  };

  return (
    <div className="absolute bottom-20 right-8">
      {/* Initial cute Dudu asking to click */}
      {animationPhase === 'initial' && (
        <div
          className="cursor-pointer transition-transform duration-300 hover:scale-105 animate-bounce"
          onClick={handleClick}
        >
          <img
            src={cuteDuduClick}
            alt="Cute Dudu - Click me!"
            className="w-32 h-32 drop-shadow-lg"
          />
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
              Click me! 💕
            </div>
          </div>
        </div>
      )}

      {/* Bubu kiss animation */}
      {animationPhase === 'kiss' && (
        <div className="animate-scale-in">
          <img
            src={bubuKiss}
            alt="Bubu giving a kiss"
            className="w-40 h-40 drop-shadow-lg animate-pulse"
          />
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-red-500 animate-float-hearts"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  fontSize: '1.5rem'
                }}
              >
                💋
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growing heart */}
      {animationPhase === 'heart-growing' && (
        <div className="flex items-center justify-center">
          <div 
            className="text-red-500 transition-transform duration-75 animate-pulse"
            style={{
              transform: `scale(${heartScale})`,
              fontSize: '4rem'
            }}
          >
            ❤️
          </div>
        </div>
      )}

      {/* Heart burst with floating hearts */}
      {animationPhase === 'heart-burst' && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {floatingHearts.map(heart => (
            <div
              key={heart.id}
              className="absolute text-red-500 animate-float-hearts text-4xl"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: '3s'
              }}
            >
              {['❤️', '💕', '💖', '💗', '💘'][heart.id % 5]}
            </div>
          ))}
        </div>
      )}

      {/* Anniversary message with Dudu showering hearts */}
      {animationPhase === 'anniversary' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl animate-love-bounce mb-4 leading-tight">
              🎉 Happy 6 months of togetherness! 🎉
            </h1>
          </div>
          
          {/* Dudu showering hearts */}
          <div className="animate-bounce">
            <img
              src={duduHearts}
              alt="Dudu showering hearts"
              className="w-48 h-48 drop-shadow-2xl"
            />
          </div>
          
          {/* Additional floating hearts from Dudu */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`dudu-heart-${i}`}
                className="absolute text-pink-500 animate-float-hearts"
                style={{
                  left: `${45 + Math.random() * 10}%`,
                  top: `${30 + Math.random() * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '4s',
                  fontSize: '2rem'
                }}
              >
                {['💕', '💖', '💗', '💘', '💓'][i % 5]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};