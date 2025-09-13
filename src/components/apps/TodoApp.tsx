import { useState } from "react";
import { Plus, Heart, Calendar, MapPin, Check, Trash2, Edit3, X } from "lucide-react";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  type: "date" | "activity" | "outing";
  date?: string;
  completed: boolean;
  createdAt: string;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "1",
      title: "Visit the Art Museum",
      description: "Explore the new contemporary art exhibition together",
      type: "outing",
      date: "2024-09-15",
      completed: false,
      createdAt: "2024-08-30"
    },
    {
      id: "2", 
      title: "Cook Pasta Together",
      description: "Try making homemade pasta from scratch",
      type: "activity",
      completed: false,
      createdAt: "2024-08-29"
    },
    {
      id: "3",
      title: "Weekend Getaway",
      description: "Plan a romantic weekend trip to the mountains",
      type: "date",
      date: "2024-10-05",
      completed: false,
      createdAt: "2024-08-28"
    }
  ]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    type: "activity" as TodoItem["type"],
    date: ""
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTodo, setEditTodo] = useState(newTodo);

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.title,
        description: newTodo.description,
        type: newTodo.type,
        date: newTodo.date || undefined,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setTodos(prev => [todo, ...prev]);
      setNewTodo({
        title: "",
        description: "",
        type: "activity",
        date: ""
      });
    }
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditTodo({
      title: todo.title,
      description: todo.description,
      type: todo.type,
      date: todo.date || ""
    });
  };

  const saveEdit = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...editTodo, date: editTodo.date || undefined }
        : todo
    ));
    setEditingId(null);
    setEditTodo({
      title: "",
      description: "",
      type: "activity",
      date: ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTodo({
      title: "",
      description: "",
      type: "activity",
      date: ""
    });
  };

  const getTypeIcon = (type: TodoItem["type"]) => {
    switch (type) {
      case "date": return <Heart className="w-4 h-4 text-love-pink" />;
      case "outing": return <MapPin className="w-4 h-4 text-blue-500" />;
      default: return <Calendar className="w-4 h-4 text-green-500" />;
    }
  };

  const getTypeColor = (type: TodoItem["type"]) => {
    switch (type) {
      case "date": return "bg-love-blush/20 border-love-pink/30";
      case "outing": return "bg-blue-50 border-blue-300";
      default: return "bg-green-50 border-green-300";
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar for adding new todos */}
      <div className="w-1/3 bg-muted/50 p-6 border-r border-border flex flex-col overflow-y-auto">
        <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
          <Plus className="text-love-pink" />
          New Todo
        </h3>
        
        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {(['activity', 'date', 'outing'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setNewTodo(prev => ({ ...prev, type }))}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs shrink-0 transition-colors ${
                    newTodo.type === type 
                      ? "bg-love-pink text-white" 
                      : "bg-card text-card-foreground hover:bg-accent"
                  }`}
                >
                  {getTypeIcon(type)}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What do you want to do?"
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink bg-card text-card-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Description
            </label>
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add some details..."
              className="w-full p-3 border border-border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-love-pink bg-card text-card-foreground"
            />
          </div>

          {(newTodo.type === 'date' || newTodo.type === 'outing') && (
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Date
              </label>
              <input
                type="date"
                value={newTodo.date}
                onChange={(e) => setNewTodo(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink bg-card text-card-foreground"
              />
            </div>
          )}
        </div>
        
        <div className="-mx-6 mt-4 sticky bottom-0 z-10 bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/50 p-6 pt-3 border-t border-border">
          <button
            onClick={addTodo}
            className="w-full bg-gradient-love text-white py-3 rounded-lg hover:shadow-love transition-all duration-300 font-medium"
          >
            Add Todo ❤️
          </button>
        </div>
      </div>

      {/* Main todos view */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
          <Heart className="text-love-pink fill-current" />
          Our Future Plans
        </h3>

        <div className="space-y-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`p-4 rounded-xl shadow-soft border ${getTypeColor(todo.type)} ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              {editingId === todo.id ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(['activity', 'date', 'outing'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setEditTodo(prev => ({ ...prev, type }))}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs shrink-0 ${
                          editTodo.type === type 
                            ? "bg-love-pink text-white" 
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {getTypeIcon(type)}
                        {type}
                      </button>
                    ))}
                  </div>
                  
                  <input
                    type="text"
                    value={editTodo.title}
                    onChange={(e) => setEditTodo(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                  
                  <textarea
                    value={editTodo.description}
                    onChange={(e) => setEditTodo(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white resize-none h-20"
                  />
                  
                  {(editTodo.type === 'date' || editTodo.type === 'outing') && (
                    <input
                      type="date"
                      value={editTodo.date}
                      onChange={(e) => setEditTodo(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-2 border rounded-lg bg-white"
                    />
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          todo.completed 
                            ? 'bg-love-pink border-love-pink text-white' 
                            : 'border-gray-300 hover:border-love-pink'
                        }`}
                      >
                        {todo.completed && <Check className="w-3 h-3" />}
                      </button>
                      
                      {getTypeIcon(todo.type)}
                      
                      <h4 className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
                        {todo.title}
                      </h4>
                    </div>
                    
                    <p className={`text-sm text-muted-foreground mb-2 ${todo.completed ? 'line-through' : ''}`}>
                      {todo.description}
                    </p>
                    
                  </div>
                  
                  <div className="flex gap-1 ml-4">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-2 text-gray-500 hover:text-love-pink transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No plans yet. Start adding some! 💕</p>
          </div>
        )}
      </div>
    </div>
  );
};