// src/components/FolderWindow.tsx
import React from "react";

interface FolderWindowProps {
  title?: string;
  onClose: () => void;
}

export default function FolderWindow({
  title = "Folder",
  onClose,
}: FolderWindowProps): JSX.Element {
  return (
    <div
      className="fixed top-24 left-24 w-[520px] h-[420px] bg-white rounded-2xl shadow-xl border border-pink-200 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-2xl border-b border-pink-100">
        <div className="flex items-center gap-2">
          <img src="/heart-folder.svg" alt="" className="w-6 h-6" />
          <span className="font-semibold text-pink-700">{title}</span>
        </div>

        <div>
          <button
            onClick={onClose}
            aria-label="Close folder"
            className="px-3 py-1 rounded-md bg-pink-400 text-white hover:bg-pink-500"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Empty content area */}
      <div className="flex-1 flex items-center justify-center text-pink-400 italic">
        (This folder is empty… for now 💌)
      </div>
    </div>
  );
}
