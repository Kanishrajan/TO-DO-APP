import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { Task, Priority } from '../types';
import { X, Check } from 'lucide-react';

interface EditModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newTitle: string, newPriority: Priority) => void;
}

export default function EditModal({ task, isOpen, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
    }
  }, [task]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;
    onSave(task.id, title.trim(), priority);
    onClose();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        id="edit-task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
        className="w-full max-w-lg bg-white border-3 border-[#111111] brutal-shadow-xl p-6 sm:p-7 relative transition-all duration-200 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF3B30] border border-[#111111] inline-block" />
            <h2 id="edit-modal-title" className="font-display text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
              EDIT TASK
            </h2>
          </div>
          <button
            id="close-edit-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center border-2 border-[#111111] bg-white hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
              TASK TITLE
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Update task title..."
              className="w-full bg-[#F5F5F0] border-2 border-[#111111] px-4 py-3 font-mono-tech text-sm sm:text-base text-[#111111] font-medium outline-none focus:bg-white focus:shadow-[3px_3px_0_#111111]"
            />
          </div>

          {/* Priority Selector */}
          <div>
            <label className="block font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
              PRIORITY
            </label>
            <div className="flex items-center gap-2.5">
              {(['HIGH', 'MEDIUM', 'LOW'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                let bgStyle = '';
                if (p === 'HIGH') bgStyle = isSelected ? 'bg-[#FF3B30] text-[#111111] brutal-selected' : 'hover:bg-[#FF3B30]/20';
                if (p === 'MEDIUM') bgStyle = isSelected ? 'bg-[#FFD600] text-[#111111] brutal-selected' : 'hover:bg-[#FFD600]/20';
                if (p === 'LOW') bgStyle = isSelected ? 'bg-[#B6FF00] text-[#111111] brutal-selected' : 'hover:bg-[#B6FF00]/20';

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 text-xs font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${bgStyle}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons: Cancel and Save */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#111111]/20">
            <button
              type="button"
              id="cancel-edit-btn"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#F5F5F0] hover:bg-white border-2 border-[#111111] font-mono-tech text-xs font-bold text-[#111111] cursor-pointer transition-all"
            >
              [ CANCEL ]
            </button>

            <button
              type="submit"
              id="save-edit-btn"
              className="brutal-btn px-6 py-2.5 bg-[#111111] text-white border-2 border-[#111111] font-display text-sm tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#B6FF00]" strokeWidth={3} />
              <span>SAVE →</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
