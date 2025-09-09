import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar, Heart, Edit3, Trash2, Check, X } from "lucide-react";
import bubuDuduImage from "../../assets/bubu-dudu.gif";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState({ date: "", title: "", description: "" });

  const handleCardClick = () => {
    if (editingId) return; // Don't flip when editing
    setIsFlipped(!isFlipped);
  };

  const startEditing = (date: ImportantDate) => {
    setEditingId(date.id);
    setEditTitle(date.title);
    setEditDescription(date.description);
    setEditDate(date.date);
  };

  const saveEdit = () => {
    setDates(prev => prev.map(date => 
      date.id === editingId 
        ? { ...date, title: editTitle, description: editDescription, date: editDate }
        : date
    ));
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDate("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDate("");
  };

  const deleteDate = (id: string) => {
    setDates(prev => prev.filter(date => date.id !== id));
    if (currentIndex >= dates.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
    <div className="h-full p-4 flex flex-col max-h-screen overflow-hidden">
      <div className="text-center mb-4 flex-shrink-0">
        <h3 className="text-2xl font-bold text-card-foreground flex items-center justify-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Important Dates
        </h3>
        <p className="text-muted-foreground mt-2">Use ← → arrow keys to navigate</p>
      </div>


      {/* Main card area */}
      <div className="flex-1 flex items-center justify-center relative min-h-0">
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
        <div className="relative w-72 h-80 mx-20 perspective-1000">
          {/* Peeking Dudu - appears from right edge of card when not flipped */}
          {!isFlipped && (
            <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
              <div className="animate-fade-in">
                <img 
                  src={bubuDuduImage} 
                  alt="Dudu peeking" 
                  className="w-16 h-12 transform scale-x-[-1]" 
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-800 whitespace-nowrap border border-gray-200 shadow-lg">
                  👀 Peek!
                </div>
              </div>
            </div>
          )}
          <div
            className={`w-full h-full relative transform-style-preserve-3d cursor-pointer transition-transform duration-600 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleCardClick}
          >
            {/* Front of card */}
            <div className="absolute inset-0 bg-gradient-love rounded-2xl shadow-dreamy backface-hidden flex flex-col items-center justify-center p-4 text-white">
              {editingId === currentDate.id ? (
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 rounded-lg text-gray-800 text-center font-bold"
                    placeholder="Title"
                  />
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full p-2 rounded-lg text-gray-800 text-center"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 rounded-lg text-gray-800 resize-none h-20 text-sm"
                    placeholder="Story"
                  />
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Calendar className="w-10 h-10 mb-3" />
                  <h4 className="text-xl font-bold mb-2 text-center">{currentDate.title}</h4>
                  <p className="text-base mb-3">{new Date(currentDate.date).toLocaleDateString()}</p>
                  <div className="text-sm opacity-80 text-center">Click to reveal story ❤️</div>
                  
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(currentDate);
                      }}
                      className="bg-white/20 p-1.5 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDate(currentDate.id);
                      }}
                      className="bg-red-500/80 p-1.5 rounded-lg hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 bg-card rounded-2xl shadow-dreamy backface-hidden rotate-y-180 p-4 flex flex-col justify-center">
              <h4 className="text-lg font-bold text-card-foreground mb-3 text-center">{currentDate.title}</h4>
              <div className="flex-1 flex items-center">
                <p className="text-card-foreground leading-relaxed text-sm">{currentDate.description}</p>
              </div>
              <div className="text-xs text-muted-foreground text-center mt-2">
                Click again to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card counter and add button */}
      <div className="flex items-center justify-between mt-4 flex-shrink-0">
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