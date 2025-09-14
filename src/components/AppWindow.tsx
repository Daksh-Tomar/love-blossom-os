import { ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface AppWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export const AppWindow = ({ title, children, onClose, onMinimize, isMaximized, onToggleMaximize }: AppWindowProps) => {
  return (
    <div className={`fixed z-50 flex items-center justify-center ${isMaximized ? 'inset-0' : 'inset-8'}`}>
      <div className={`bg-card/95 backdrop-blur-lg rounded-2xl shadow-love border border-white/20 flex flex-col animate-slide-up ${
        isMaximized 
          ? 'w-full h-full rounded-none' 
          : 'w-full max-w-6xl h-full max-h-[85vh]'
      }`}>
        {/* Window header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          
          {/* Window controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className="w-3 h-3 bg-love-gold rounded-full hover:bg-love-gold/80 transition-colors"
              title="Minimize"
            />
            <button 
              onClick={onToggleMaximize}
              className="w-3 h-3 bg-accent rounded-full hover:bg-accent/80 transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            />
            <button 
              onClick={onClose}
              className="w-3 h-3 bg-destructive rounded-full hover:bg-destructive/80 transition-colors"
              title="Close"
            />
          </div>
        </div>

        {/* Window content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};