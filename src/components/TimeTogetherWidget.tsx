import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimeTogetherWidget: React.FC = () => {
  const startDate = new Date("2025-04-07T00:00:00");
  const [daysTogether, setDaysTogether] = useState(0);
  const [dayProgress, setDayProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // calculate days
  useEffect(() => {
    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    setDaysTogether(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  // calculate day progress + live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime();
      const endOfDay = startOfDay + 24 * 60 * 60 * 1000;
      const progress =
        ((now.getTime() - startOfDay) / (endOfDay - startOfDay)) * 100;
      setDayProgress(Math.floor(progress));
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLike = () => {
    setLiked(true);
    setShowBigHeart(true);
    setTimeout(() => setShowBigHeart(false), 800); // hide after animation
  };

  return (
    <div className="absolute top-4 right-4 w-72 rounded-2xl shadow-lg bg-white/80 backdrop-blur-lg p-4 border border-pink-200 text-center font-sans">
      {/* Time */}
      <div className="text-right text-sm text-gray-600">{currentTime}</div>

      {/* Time together */}
      <h2 className="text-gray-700 text-base mt-1">Time together</h2>
      <div className="text-4xl font-bold text-pink-500">{daysTogether}</div>
      <p className="text-gray-700 text-sm">days</p>
      <p className="text-gray-500 text-xs">Since April 7, 2025</p>

      {/* cute emojis */}
      <div className="mt-2 text-lg">💖 ✨ 💕</div>

      {/* progress bar */}
      <div className="w-full bg-pink-100 rounded-full h-2 mt-3">
        <div
          className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full"
          style={{ width: `${dayProgress}%` }}
        />
      </div>
      <p className="text-xs text-pink-600 mt-1">Day progress: {dayProgress}%</p>

      {/* milestone */}
      {daysTogether >= 150 && (
        <p className="text-xs text-gray-600 mt-2">🎉 150+ days milestone! 🎉</p>
      )}

      {/* Heart button */}
      <button
        onClick={handleLike}
        className={`mt-3 text-2xl transition-transform ${
          liked ? "text-pink-500 scale-110" : "text-gray-400"
        }`}
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* Big Heart animation like Instagram */}
      <AnimatePresence>
        {showBigHeart && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1000] pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-pink-400 text-8xl">❤️</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeTogetherWidget;
