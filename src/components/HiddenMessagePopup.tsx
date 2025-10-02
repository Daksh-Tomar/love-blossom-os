import { useState } from "react";
import { X } from "lucide-react";
import helloKittyHeart from "../assets/hello-kitty-heart.png";
import helloKittyConfetti from "../assets/hello-kitty-confetti.png";
import lovePicture1 from "../assets/love-picture-1.jpg";
import lovePicture2 from "../assets/love-picture-2.jpg";
import lovePicture3 from "../assets/love-picture-3.jpg";

interface HiddenMessagePopupProps {
  onClose: () => void;
}

type Stage = "hello-kitty" | "go-further" | "envelope" | "letter" | "confetti" | "pictures";

export const HiddenMessagePopup = ({ onClose }: HiddenMessagePopupProps) => {
  const [stage, setStage] = useState<Stage>("hello-kitty");
  const [currentPicture, setCurrentPicture] = useState(0);

  const lovePictures = [lovePicture1, lovePicture2, lovePicture3];

  const loveLetterText = `My Dearest Love,

Every moment with you feels like a beautiful dream that I never want to wake up from. You are the sunshine that brightens my darkest days and the moonlight that guides me through the night.

When I look into your eyes, I see our future together - filled with laughter, adventures, and endless love. You make my heart skip a beat with just a smile, and your laughter is the most beautiful melody I've ever heard.

I promise to love you through every season of life, to support your dreams, and to be your partner in all things. You are my best friend, my soulmate, and my forever love.

Thank you for choosing me, for loving me, and for being the most incredible person I've ever known.

With all my heart,
Forever Yours 💕`;

  const handleNext = () => {
    if (stage === "hello-kitty") {
      setStage("go-further");
    } else if (stage === "go-further") {
      setStage("envelope");
    } else if (stage === "envelope") {
      setStage("letter");
    } else if (stage === "letter") {
      setStage("confetti");
    } else if (stage === "confetti") {
      setStage("pictures");
    } else if (stage === "pictures") {
      if (currentPicture < lovePictures.length - 1) {
        setCurrentPicture(currentPicture + 1);
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] animate-fade-in p-4">
      <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200 rounded-3xl p-8 max-w-4xl w-full mx-auto shadow-2xl animate-scale-in border-4 border-white/40 max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-rose-500/80 rounded-full p-2 hover:bg-rose-600/90 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hello Kitty with Heart Stage */}
        {stage === "hello-kitty" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <img 
              src={helloKittyHeart} 
              alt="Hello Kitty with heart" 
              className="w-64 h-64 object-contain animate-bounce"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 drop-shadow-lg animate-pulse">
              Wow! You found the hidden message! 🎉
            </h2>
            <button
              onClick={handleNext}
              className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
            >
              Click to continue ✨
            </button>
          </div>
        )}

        {/* Go Further Stage */}
        {stage === "go-further" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div className="text-7xl animate-bounce">💖</div>
            <h2 className="text-5xl md:text-6xl font-bold text-purple-600 drop-shadow-lg">
              Go Further...
            </h2>
            <p className="text-2xl text-gray-700">There's something special waiting for you</p>
            <button
              onClick={handleNext}
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-full text-2xl font-bold hover:scale-110 transition-transform shadow-lg hover:shadow-xl animate-pulse"
            >
              Continue the journey 🌟
            </button>
          </div>
        )}

        {/* Envelope Stage */}
        {stage === "envelope" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div 
              className="text-9xl cursor-pointer hover:scale-110 transition-transform animate-bounce"
              onClick={handleNext}
            >
              💌
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 drop-shadow-lg">
              You've got mail!
            </h2>
            <p className="text-xl text-gray-700">Click the envelope to open it</p>
          </div>
        )}

        {/* Love Letter Stage */}
        {stage === "letter" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <h2 className="text-4xl font-bold text-rose-600 drop-shadow-lg mb-6 text-center flex items-center justify-center gap-3">
              💌 A Love Letter For You 💌
            </h2>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex-1 overflow-y-auto shadow-inner border-2 border-pink-300 mb-6">
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line" style={{fontFamily: 'Georgia, serif'}}>
                {loveLetterText}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-110 transition-transform shadow-lg hover:shadow-xl animate-pulse"
              >
                Wait there is more! 🎁
              </button>
            </div>
          </div>
        )}

        {/* Confetti Stage */}
        {stage === "confetti" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center relative">
            {/* Confetti animation */}
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti-fall text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                {['🎉', '🎊', '💖', '💕', '❤️', '💗', '✨', '🌟'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
            
            <img 
              src={helloKittyConfetti} 
              alt="Hello Kitty celebrating" 
              className="w-72 h-72 object-contain animate-bounce z-10"
            />
            <h2 className="text-5xl md:text-6xl font-bold text-purple-600 drop-shadow-lg mt-6 z-10">
              Surprise! 🎊
            </h2>
            <button
              onClick={handleNext}
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-full text-2xl font-bold hover:scale-110 transition-transform shadow-lg hover:shadow-xl z-10"
            >
              See beautiful memories 💝
            </button>
          </div>
        )}

        {/* Love Pictures Stage */}
        {stage === "pictures" && (
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <img 
              src={lovePictures[currentPicture]} 
              alt={`Love picture ${currentPicture + 1}`}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              {currentPicture > 0 && (
                <button
                  onClick={() => setCurrentPicture(currentPicture - 1)}
                  className="bg-white/90 text-rose-600 px-6 py-3 rounded-full text-lg font-bold hover:scale-110 transition-transform shadow-lg"
                >
                  ← Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:scale-110 transition-transform shadow-lg"
              >
                {currentPicture < lovePictures.length - 1 ? "Next →" : "Finish 💕"}
              </button>
            </div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {lovePictures.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentPicture ? 'bg-rose-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
