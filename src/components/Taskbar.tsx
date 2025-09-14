import { useState, useEffect } from "react";
import { Heart, Sparkles, Star, BookHeart } from "lucide-react";
import { AppType } from "./Desktop";

interface TaskbarProps {
  minimizedApps?: AppType[];
  onRestoreApp?: (app: AppType) => void;
}

export const Taskbar = ({ minimizedApps = [], onRestoreApp }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-lg border-t border-white/20">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - OS logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-love rounded-lg p-2">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-white font-medium drop-shadow-sm">Love OS</span>
        </div>

        {/* Center - Minimized apps and floating hearts */}
        <div className="flex items-center space-x-4">
          {/* Minimized apps */}
          {minimizedApps.map((app) => {
            const getAppIcon = (appId: AppType) => {
              switch (appId) {
                case 'memories': return Sparkles;
                case 'todo': return Heart;
                case 'dates': return Star;
                case 'story': return BookHeart;
                default: return Heart;
              }
            };
            
            const Icon = getAppIcon(app);
            
            return (
              <button
                key={app}
                onClick={() => onRestoreApp?.(app)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
                title={`Restore ${app}`}
              >
                <Icon className="w-4 h-4 text-white" />
              </button>
            );
          })}
          
          {/* Floating hearts indicator */}
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-white/70 animate-float-hearts"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                💕
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Time and date */}
        <div className="text-right">
          <div className="text-white font-medium drop-shadow-sm">
            {formatTime(currentTime)}
          </div>
          <div className="text-white/80 text-sm drop-shadow-sm">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};