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

  const handleBubuDuduClick = () => {
    setShowConfetti(true);
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
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-2 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 love-glow">
              <app.icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white text-sm font-medium drop-shadow-lg">
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

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};