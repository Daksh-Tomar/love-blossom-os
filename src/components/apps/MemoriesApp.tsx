import { useState } from "react";
import { Upload, Heart, Download, Trash2, Sparkles, Grid3X3, Images } from "lucide-react";

interface Memory {
  id: string;
  url: string;
  date: string;
  type: 'photo' | 'video';
}

interface Collage {
  id: string;
  title: string;
  images: string[];
  createdAt: string;
  type: 'collage' | 'highlight';
}

export const MemoriesApp = () => {
  const [activeTab, setActiveTab] = useState<'memories' | 'collages'>('memories');
  
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400",
      date: "2024-03-01",
      type: "photo"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400",
      date: "2024-04-15",
      type: "photo"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=400",
      date: "2024-05-20",
      type: "photo"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      date: "2024-06-10",
      type: "photo"
    }
  ]);

  const [collages, setCollages] = useState<Collage[]>([
    {
      id: "1",
      title: "Our Beautiful Moments",
      images: [
        "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400",
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400",
        "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=400",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"
      ],
      createdAt: "2024-08-30",
      type: "collage"
    },
    {
      id: "2",
      title: "Summer Highlights 2024",
      images: [
        "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=400",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"
      ],
      createdAt: "2024-08-25",
      type: "highlight"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMemory: Memory = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            date: new Date().toISOString().split('T')[0],
            type: file.type.startsWith('video/') ? 'video' : 'photo'
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

  const generateCollage = () => {
    if (memories.length < 2) return;
    
    // Select random photos (2-6 photos)
    const photoMemories = memories.filter(m => m.type === 'photo');
    const shuffled = [...photoMemories].sort(() => 0.5 - Math.random());
    const selectedImages = shuffled.slice(0, Math.min(Math.max(2, Math.floor(Math.random() * 4) + 2), 6));
    
    const newCollage: Collage = {
      id: Date.now().toString(),
      title: `Collage ${new Date().toLocaleDateString()}`,
      images: selectedImages.map(img => img.url),
      createdAt: new Date().toISOString().split('T')[0],
      type: 'collage'
    };
    
    setCollages(prev => [newCollage, ...prev]);
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-card-foreground flex items-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Precious Memories
        </h3>
        
        <div className="flex items-center gap-3">
          {activeTab === 'collages' && (
            <button
              onClick={generateCollage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate Collage
            </button>
          )}
          
          <label className="bg-gradient-love text-white px-6 py-3 rounded-full cursor-pointer hover:shadow-love transition-all duration-300 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Add {activeTab === 'memories' ? 'Photo/Video' : 'Memory'}
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('memories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-l-lg transition-colors ${
            activeTab === 'memories' 
              ? 'bg-love-pink text-white' 
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          <Images className="w-4 h-4" />
          Memories
        </button>
        <button
          onClick={() => setActiveTab('collages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-r-lg transition-colors ${
            activeTab === 'collages' 
              ? 'bg-love-pink text-white' 
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          Collages & Highlights
        </button>
      </div>

      {activeTab === 'memories' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map(memory => (
              <div key={memory.id} className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-love transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  {memory.type === 'video' ? (
                    <video
                      src={memory.url}
                      className="w-full h-48 object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={memory.url}
                      alt="Memory"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => deleteMemory(memory.id)}
                      className="bg-destructive/80 text-destructive-foreground p-2 rounded-full hover:bg-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {memory.type === 'video' ? '📹' : '📸'} {memory.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-muted-foreground text-sm">{new Date(memory.date).toLocaleDateString()}</p>
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
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collages.map(collage => (
              <div key={collage.id} className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-love transition-all duration-300">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-card-foreground">{collage.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {collage.type === 'collage' ? '🎨 Collage' : '✨ Highlight'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`grid gap-2 ${
                    collage.images.length === 2 ? 'grid-cols-2' :
                    collage.images.length === 3 ? 'grid-cols-3' :
                    collage.images.length === 4 ? 'grid-cols-2 grid-rows-2' :
                    'grid-cols-3 grid-rows-2'
                  }`}>
                    {collage.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Collage item"
                        className={`rounded-lg object-cover ${
                          collage.images.length === 2 ? 'h-32' :
                          collage.images.length === 3 ? 'h-24' :
                          collage.images.length <= 4 ? 'h-24' :
                          idx < 3 ? 'h-20' : 'h-16'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mt-3">
                    Created on {new Date(collage.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {collages.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No collages yet. Generate some from your memories! ✨</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};