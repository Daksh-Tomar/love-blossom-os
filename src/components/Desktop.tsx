import { useState } from "react";
import { Taskbar } from "./Taskbar";
import { BubuDudu } from "./BubuDudu";
import { AppWindow } from "./AppWindow";
import { MemoriesApp } from "./apps/MemoriesApp";
import { DiaryApp } from "./apps/DiaryApp";
import { ImportantDatesApp } from "./apps/ImportantDatesApp";
import { LoveLetterPopup } from "./LoveLetterPopup";
import { ConfettiPopup } from "./ConfettiPopup";
import loveWallpaper from "../assets/love-wallpaper.jpg";
import { Heart, Camera, BookOpen, Calendar } from "lucide-react";

export type AppType = "memories" | "diary" | "dates" | null;

export const Desktop = () => {
  const [activeApp, setActiveApp] = useState<AppType>(null);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleBubuDuduClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowNotification(true);
    }, 4500); // Show notification after confetti
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowLoveLetter(true);
  };

  const apps = [
    {
      id: "memories" as const,
      name: "Memories",
      icon: Camera,
      component: MemoriesApp
    },
    {
      id: "diary" as const,
      name: "Diary",
      icon: BookOpen,
      component: DiaryApp
    },
    {
      id: "dates" as const,
      name: "Important Dates",
      icon: Calendar,
      component: ImportantDatesApp
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat cursor-love"
      style={{ backgroundImage: `url(${loveWallpaper})` }}
    >
      {/* Desktop overlay */}
      <div className="absolute inset-0 bg-gradient-soft/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Desktop icons */}
      <div className="absolute top-8 left-8 space-y-6">
        {apps.map(app => (
          <div
            key={app.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => setActiveApp(app.id)}
          >
            <div className={`backdrop-blur-sm rounded-2xl p-4 mb-2 transition-all duration-300 group-hover:scale-110 love-glow animate-pulse group-hover:animate-bounce ${
              app.id === 'memories' 
                ? 'bg-gradient-to-br from-pink-400/80 to-purple-500/80 group-hover:from-pink-300/90 group-hover:to-purple-400/90' 
                : app.id === 'diary'
                ? 'bg-gradient-to-br from-emerald-400/80 to-teal-500/80 group-hover:from-emerald-300/90 group-hover:to-teal-400/90'
                : 'bg-gradient-to-br from-orange-400/80 to-red-500/80 group-hover:from-orange-300/90 group-hover:to-red-400/90'
            }`}>
              <div className="relative">
                <app.icon className="w-8 h-8 text-white drop-shadow-lg" />
                {app.id === 'memories' && <span className="absolute -top-1 -right-1 text-xs">📸</span>}
                {app.id === 'diary' && <span className="absolute -top-1 -right-1 text-xs">✏️</span>}
                {app.id === 'dates' && <span className="absolute -top-1 -right-1 text-xs">💕</span>}
              </div>
            </div>
            <span className="text-white text-sm font-medium drop-shadow-lg group-hover:scale-105 transition-transform">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bubu & Dudu */}
      <BubuDudu onSpecialClick={handleBubuDuduClick} />

      {/* App windows */}
      {activeApp && (
        <AppWindow
          title={apps.find(app => app.id === activeApp)?.name || ""}
          onClose={() => setActiveApp(null)}
        >
          {(() => {
            const app = apps.find(a => a.id === activeApp);
            if (app) {
              const Component = app.component;
              return <Component />;
            }
            return null;
          })()}
        </AppWindow>
      )}

      {/* Love letter popup */}
      {showLoveLetter && (
        <LoveLetterPopup onClose={() => setShowLoveLetter(false)} />
      )}

      {/* Confetti animation */}
      {showConfetti && (
        <ConfettiPopup onComplete={() => setShowConfetti(false)} />
      )}

      {/* Notification popup */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-[60]">
          <div 
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-4 rounded-2xl shadow-2xl cursor-pointer animate-bounce"
            onClick={handleNotificationClick}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💌</span>
              <div>
                <p className="font-bold">New Message!</p>
                <p className="text-sm opacity-90">There is a message for you 💕</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};