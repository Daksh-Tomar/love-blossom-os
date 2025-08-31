import { ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface AppWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const AppWindow = ({ title, children, onClose }: AppWindowProps) => {
  return (
    <div className="fixed inset-8 flex items-center justify-center z-50">
      <div className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-love border border-white/20 w-full max-w-4xl h-full max-h-[80vh] flex flex-col animate-slide-up">
        {/* Window header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          
          {/* Window controls */}
          <div className="flex items-center space-x-2">
            <button className="w-3 h-3 bg-love-gold rounded-full hover:bg-love-gold/80 transition-colors" />
            <button className="w-3 h-3 bg-accent rounded-full hover:bg-accent/80 transition-colors" />
            <button 
              onClick={onClose}
              className="w-3 h-3 bg-destructive rounded-full hover:bg-destructive/80 transition-colors"
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