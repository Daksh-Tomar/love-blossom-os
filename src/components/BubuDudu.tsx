import { useState, useEffect } from "react";
import cuteDuduClick from "../assets/cute-dudu-click1.gif";
import bubuKiss from "../assets/bubu-kiss.gif";
import duduHearts from "../assets/dudu-hearts.gif";

interface BubuDuduProps {
  onSpecialClick: () => void;
  resetTrigger?: boolean;
}

export const BubuDudu = ({ onSpecialClick, resetTrigger }: BubuDuduProps) => {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'kiss' | 'heart-growing' | 'heart-burst' | 'anniversary' | 'completed'>('initial');
  const [heartScale, setHeartScale] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    if (resetTrigger !== undefined) {
      setAnimationPhase('initial');
      setHeartScale(0);
      setFloatingHearts([]);
    }
  }, [resetTrigger]);

  const handleClick = () => {
    if (animationPhase === 'initial') {
      // Start the animation sequence
      setAnimationPhase('kiss');
      
      // After kiss animation (longer duration), show growing heart
      setTimeout(() => {
        setAnimationPhase('heart-growing');
        
        // Grow the heart over 3 seconds (slower)
        const growInterval = setInterval(() => {
          setHeartScale(prev => {
            if (prev >= 2.5) {
              clearInterval(growInterval);
              // Heart bursts
              setAnimationPhase('heart-burst');
              
              // Create floating hearts spread evenly
              const hearts = Array.from({length: 25}, (_, i) => ({
                id: i,
                x: 20 + (i % 5) * 15 + Math.random() * 10, // Spread across screen
                y: 20 + Math.floor(i / 5) * 15 + Math.random() * 10,
                delay: i * 0.15
              }));
              setFloatingHearts(hearts);
              
              // Show anniversary message (longer delay)
              setTimeout(() => {
                setAnimationPhase('anniversary');
                onSpecialClick();
              }, 2000);
              
              return prev;
            }
            return prev + 0.08; // Slower growth
          });
        }, 80); // Slower interval
      }, 3000); // Longer kiss duration
    }
  };

  return (
    <div className="absolute bottom-20 right-8">
      {/* Initial cute Dudu asking to click */}
      {animationPhase === 'initial' && (
        <div
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={handleClick}
        >
          <img
            src={cuteDuduClick}
            alt="Cute Dudu - Click me!"
            className="w-32 h-32 drop-shadow-lg"
          />
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Click me! 💕
            </div>
          </div>
        </div>
      )}

      {/* Bubu kiss animation */}
      {animationPhase === 'kiss' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <img
            src={bubuKiss}
            alt="Bubu giving a kiss"
            className="w-64 h-64 drop-shadow-2xl"
          />
        </div>
      )}

      {/* Growing heart */}
      {animationPhase === 'heart-growing' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <div 
            className="text-red-500 transition-transform duration-100"
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4 leading-tight">
              🎉 Happy 6 months of togetherness! 🎉
            </h1>
          </div>
          
          {/* Dudu showering hearts */}
          <div>
            <img
              src={duduHearts}
              alt="Dudu showering hearts"
              className="w-48 h-48 drop-shadow-2xl"
            />
          </div>
          
          {/* Additional floating hearts from Dudu */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`dudu-heart-${i}`}
                className="absolute text-pink-500 animate-float-hearts"
                style={{
                  left: `${30 + (i % 3) * 20 + Math.random() * 15}%`,
                  top: `${25 + Math.floor(i / 3) * 15 + Math.random() * 10}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '5s',
                  fontSize: '1.8rem'
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
