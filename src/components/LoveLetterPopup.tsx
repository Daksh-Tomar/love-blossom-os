import { X } from "lucide-react";

interface LoveLetterPopupProps {
  onClose: () => void;
}

export const LoveLetterPopup = ({ onClose }: LoveLetterPopupProps) => {
  const loveLetterText = `Happy 6 months of being together my cutiee. I love you. Well, time sure flies it feels like yesterday when we just confessed to each other and had our first macd outing together but it already been six months. You know einstein once said when you sit beside a hot women 2 hours feels like 2 mins ig he wasnt wrong. Thinking back it been a wonderful journey baby by know we have had our own disagreements, disapprovals and fights but we always came back stronger. It has been a beautiful journey of ups and downs and i have enjoyed every single bit of it. I am glad that such a strong, beautiful and charming woman asked me out. Honestly, mai kitna bhi doondh leta teri jaise understanding , intelligent, sweet, kind, cute, charming motu nhi milti mujhe... Hehe.... I love you baby and i promise to cherish our bond always and be there with you till the end......`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in p-4">
      <div className="bg-gradient-to-br from-pink-300 via-rose-300 to-red-300 rounded-3xl p-6 md:p-8 max-w-2xl w-full mx-auto shadow-2xl animate-slide-up border-4 border-white/30 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
            💌 Love Letter 💌
            <span className="text-3xl animate-spin">✨</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-2 hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex-1 overflow-y-auto shadow-inner border-2 border-pink-200 my-4">
          <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium" style={{fontFamily: 'cursive'}}>
            {loveLetterText}
          </p>
        </div>

        <div className="text-center">
          <div className="text-white text-lg md:text-xl font-bold drop-shadow-lg mb-3">
            With all my love 💖
          </div>
          <div className="flex justify-center flex-wrap gap-2 mb-3">
            {[...Array(7)].map((_, i) => (
              <span 
                key={i} 
                className="text-2xl md:text-3xl animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {['💕', '❤️', '💖', '💗', '💝', '💘', '💓'][i]}
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <img 
              src="/src/assets/bubu-dudu.gif" 
              alt="Bubu & Dudu love" 
              className="w-20 h-15 md:w-24 md:h-18 animate-pulse rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};