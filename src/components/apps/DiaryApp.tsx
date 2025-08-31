import { useState } from "react";
import { Plus, Heart, User, Users } from "lucide-react";

interface DiaryEntry {
  id: string;
  author: "me" | "her";
  content: string;
  date: string;
  time: string;
}

export const DiaryApp = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      author: "me",
      content: "Today was amazing! We went to the movies and she laughed at all my jokes. I love seeing her smile 😊",
      date: "2024-08-30",
      time: "22:30"
    },
    {
      id: "2", 
      author: "her",
      content: "He's so sweet! Bought me my favorite flowers today just because. These little gestures mean everything 💕",
      date: "2024-08-29",
      time: "18:45"
    }
  ]);

  const [newEntry, setNewEntry] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<"me" | "her">("me");

  const addEntry = () => {
    if (newEntry.trim()) {
      const now = new Date();
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        author: selectedAuthor,
        content: newEntry,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].slice(0, 5)
      };
      
      setEntries(prev => [entry, ...prev]);
      setNewEntry("");
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar for writing */}
      <div className="w-1/3 bg-muted/50 p-6 border-r border-border">
        <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
          <Plus className="text-love-pink" />
          New Entry
        </h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Writing as:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedAuthor("me")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedAuthor === "me" 
                  ? "bg-love-pink text-white" 
                  : "bg-card text-card-foreground hover:bg-accent"
              }`}
            >
              <User className="w-4 h-4" />
              Me
            </button>
            <button
              onClick={() => setSelectedAuthor("her")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedAuthor === "her" 
                  ? "bg-love-pink text-white" 
                  : "bg-card text-card-foreground hover:bg-accent"
              }`}
            >
              <Users className="w-4 h-4" />
              Her
            </button>
          </div>
        </div>

        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Share your thoughts about today..."
          className="w-full h-40 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-love-pink bg-card text-card-foreground"
        />
        
        <button
          onClick={addEntry}
          className="w-full mt-4 bg-gradient-love text-white py-3 rounded-lg hover:shadow-love transition-all duration-300 font-medium"
        >
          Add Entry ❤️
        </button>
      </div>

      {/* Main diary view */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Shared Diary
        </h3>

        <div className="space-y-4">
          {entries.map(entry => (
            <div
              key={entry.id}
              className={`p-4 rounded-xl shadow-soft ${
                entry.author === "me" 
                  ? "bg-love-blush/50 ml-8" 
                  : "bg-accent/50 mr-8"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {entry.author === "me" ? (
                    <User className="w-4 h-4 text-love-pink" />
                  ) : (
                    <Users className="w-4 h-4 text-accent-foreground" />
                  )}
                  <span className="font-medium text-card-foreground">
                    {entry.author === "me" ? "You" : "Her"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.date} at {entry.time}
                </div>
              </div>
              
              <p className="text-card-foreground leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No diary entries yet. Start sharing your thoughts! 💕</p>
          </div>
        )}
      </div>
    </div>
  );
};