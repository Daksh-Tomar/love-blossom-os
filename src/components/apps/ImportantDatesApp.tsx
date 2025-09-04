import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar, Heart, Eye, EyeOff } from "lucide-react";
import bubuDuduImage from "../../assets/bubu-dudu.png";

interface ImportantDate {
  id: string;
  date: string;
  title: string;
  description: string;
}

export const ImportantDatesApp = () => {
  const [dates, setDates] = useState<ImportantDate[]>([
    {
      id: "1",
      date: "2024-02-29",
      title: "Our First Date",
      description: "The day we first went out together to McDonald's. I was so nervous but you made me feel so comfortable. Your smile lit up the whole place! 💕"
    },
    {
      id: "2",
      date: "2024-03-15", 
      title: "First 'I Love You'",
      description: "The moment we both confessed our feelings. I still remember how my heart was beating so fast, but hearing you say it back was the most beautiful moment ever! ❤️"
    },
    {
      id: "3",
      date: "2024-08-31",
      title: "6 Months Together",
      description: "Half a year of the most wonderful journey with the most amazing person. Every day with you feels like a beautiful adventure! 🥰"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState({ date: "", title: "", description: "" });
  const [showBubuAnimation, setShowBubuAnimation] = useState(false);

  // Show Bubu covering eyes when card is flipped
  useEffect(() => {
    if (isFlipped) {
      setShowBubuAnimation(true);
    } else {
      setShowBubuAnimation(false);
    }
  }, [isFlipped]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    } else if (e.key === "ArrowRight" && currentIndex < dates.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, dates.length]);

  const addNewDate = () => {
    if (newDate.date && newDate.title && newDate.description) {
      const newEntry: ImportantDate = {
        id: Date.now().toString(),
        ...newDate
      };
      setDates(prev => [...prev, newEntry]);
      setNewDate({ date: "", title: "", description: "" });
      setShowForm(false);
    }
  };

  if (dates.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-4">No important dates yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-love text-white px-6 py-3 rounded-full hover:shadow-love transition-all duration-300"
          >
            Add First Date 💕
          </button>
        </div>
      </div>
    );
  }

  const currentDate = dates[currentIndex];

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-card-foreground flex items-center justify-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Important Dates
        </h3>
        <p className="text-muted-foreground mt-2">Use ← → arrow keys to navigate</p>
      </div>

      {/* Bubu animation overlay */}
      {showBubuAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex items-center space-x-4 animate-fade-in">
            <div className="relative">
              <img src={bubuDuduImage} alt="Bubu & Dudu" className="w-24 h-16" />
              {!isFlipped ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <EyeOff className="w-8 h-8 text-love-pink" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">😘💕</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main card area */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Navigation arrows */}
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === 0}
          className="absolute left-4 p-2 bg-love-blush rounded-full hover:bg-love-pink hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            if (currentIndex < dates.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === dates.length - 1}
          className="absolute right-4 p-2 bg-love-blush rounded-full hover:bg-love-pink hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Card */}
        <div className="relative w-80 h-96 mx-16 perspective-1000">
          <div
            className={`w-full h-full relative transform-style-preserve-3d cursor-pointer transition-transform duration-600 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleCardClick}
          >
            {/* Front of card */}
            <div className="absolute inset-0 bg-gradient-love rounded-2xl shadow-dreamy backface-hidden flex flex-col items-center justify-center p-6 text-white">
              <Calendar className="w-12 h-12 mb-4" />
              <h4 className="text-2xl font-bold mb-2">{currentDate.title}</h4>
              <p className="text-lg">{new Date(currentDate.date).toLocaleDateString()}</p>
              <div className="mt-4 text-sm opacity-80">Click to reveal story ❤️</div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 bg-card rounded-2xl shadow-dreamy backface-hidden rotate-y-180 p-6 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-card-foreground mb-4">{currentDate.title}</h4>
              <p className="text-card-foreground leading-relaxed">{currentDate.description}</p>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Click again to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card counter and add button */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-muted-foreground">
          {currentIndex + 1} of {dates.length}
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-love text-white px-4 py-2 rounded-full hover:shadow-love transition-all duration-300 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Date
        </button>
      </div>

      {/* Add new date form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-6 max-w-md w-full mx-4 shadow-dreamy">
            <h4 className="text-xl font-bold text-card-foreground mb-4">Add New Important Date</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Date</label>
                <input
                  type="date"
                  value={newDate.date}
                  onChange={(e) => setNewDate(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={newDate.title}
                  onChange={(e) => setNewDate(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What happened on this day?"
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Story</label>
                <textarea
                  value={newDate.description}
                  onChange={(e) => setNewDate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell the beautiful story of this day..."
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink bg-background resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-muted text-muted-foreground py-3 rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewDate}
                className="flex-1 bg-gradient-love text-white py-3 rounded-lg hover:shadow-love transition-all duration-300"
              >
                Add Date ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};