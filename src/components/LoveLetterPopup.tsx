import { X } from "lucide-react";

interface LoveLetterPopupProps {
  onClose: () => void;
}

export const LoveLetterPopup = ({ onClose }: LoveLetterPopupProps) => {
  const loveLetterText = `Happy 6 months of being together my cutiee. I love you. Well, time sure flies it feels like yesterday when we just confessed to each other and had our first macd outing together but it already been six months. You know einstein once said when you sit beside a hot women 2 hours feels like 2 mins ig he wasnt wrong. Thinking back it been a wonderful journey baby by know we have had our own disagreements, disapprovals and fights but we always came back stronger. It has been a beautiful journey of ups and downs and i have enjoyed every single bit of it. I am glad that such a strong, beautiful and charming woman asked me out. Honestly, mai kitna bhi doondh leta teri jaise understanding , intelligent, sweet, kind, cute, charming motu nhi milti mujhe... Hehe.... I love you baby and i promise to cherish our bond always and be there with you till the end......`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in">
      <div className="bg-gradient-love rounded-3xl p-8 max-w-2xl mx-4 shadow-dreamy animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Happy 6 Months ❤️
            <span className="text-2xl animate-love-bounce">💕</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-h-96 overflow-y-auto">
          <p className="text-white leading-relaxed text-lg">
            {loveLetterText}
          </p>
        </div>

        <div className="mt-6 text-center">
          <div className="text-white/90 text-sm">
            With all my love 💖
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className="text-2xl animate-sparkle"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};