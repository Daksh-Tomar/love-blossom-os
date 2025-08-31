import { useState } from "react";
import { Upload, Heart, Download, Trash2 } from "lucide-react";

interface Memory {
  id: string;
  url: string;
  date: string;
  caption: string;
}

export const MemoriesApp = () => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400",
      date: "2024-03-01",
      caption: "Our first date at the park 💕"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400",
      date: "2024-04-15",
      caption: "Cute dinner together 🥰"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMemory: Memory = {
            id: Date.now().toString(),
            url: e.target?.result as string,
            date: new Date().toISOString().split('T')[0],
            caption: "New beautiful memory ❤️"
          };
          setMemories(prev => [newMemory, ...prev]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-card-foreground flex items-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Precious Memories
        </h3>
        
        <label className="bg-gradient-love text-white px-6 py-3 rounded-full cursor-pointer hover:shadow-love transition-all duration-300 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Add Memory
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map(memory => (
          <div key={memory.id} className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-love transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => deleteMemory(memory.id)}
                  className="bg-destructive/80 text-destructive-foreground p-2 rounded-full hover:bg-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-card-foreground font-medium mb-2">{memory.caption}</p>
              <p className="text-muted-foreground text-sm">{memory.date}</p>
            </div>
          </div>
        ))}
      </div>

      {memories.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No memories yet. Start adding some! 💕</p>
        </div>
      )}
    </div>
  );
};