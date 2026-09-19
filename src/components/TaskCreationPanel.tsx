import { useState, FormEvent, KeyboardEvent } from 'react';
import { Priority } from '../types';
import { Plus } from 'lucide-react';

interface TaskCreationPanelProps {
  onAddTask: (title: string, priority: Priority) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TaskCreationPanel({ onAddTask, inputRef }: TaskCreationPanelProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setIsError(true);
      return;
    }
    onAddTask(title.trim(), priority);
    setTitle('');
    setIsError(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="task-creation-section" className="w-full bg-white border-2 sm:border-3 border-[#111111] p-5 sm:p-7 brutal-shadow relative">
      {/* Physical Hardware Bolt Accents on Corners */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-[#111111] bg-[#e2e8f0]" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-[#111111] bg-[#e2e8f0]" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-[#111111] bg-[#e2e8f0]" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-[#111111] bg-[#e2e8f0]" />

      {/* Control Panel Header */}
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#FF3B30] inline-block border border-[#111111]" />
          <h2 className="font-display text-lg sm:text-2xl text-[#111111] tracking-tight uppercase">
            WHAT NEEDS TO GET DONE?
          </h2>
        </div>
        <span className="font-mono-tech text-[10px] sm:text-xs text-[#111111]/70 font-semibold hidden xs:inline">
          PANEL // INPUT-MOD-01
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Main Task Input */}
        <div>
          <label htmlFor="new-task-input" className="sr-only">
            Task Description
          </label>
          <div className="relative">
            <input
              id="new-task-input"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (isError) setIsError(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter your task here (e.g. Audit typography system, Refactor 3D pipeline)..."
              className={`w-full bg-[#F5F5F0] text-[#111111] placeholder-[#111111]/45 border-2 border-[#111111] px-4 py-3.5 sm:py-4 font-mono-tech text-sm sm:text-base font-medium outline-none transition-all duration-150 focus:bg-white focus:shadow-[4px_4px_0_#111111] ${
                isError ? 'border-[#FF3B30] bg-[#FF3B30]/10' : ''
              }`}
            />
            {isError && (
              <p className="mt-1.5 font-mono-tech text-xs text-[#FF3B30] font-bold">
                ! TASK TITLE CANNOT BE EMPTY. ENTER INSTRUCTION TO DISPATCH.
              </p>
            )}
          </div>
        </div>

        {/* Priority Selector & Action Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Priority Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider">
              PRIORITY:
            </span>
            <div className="flex items-center gap-2">
              {/* HIGH: Red background + black text */}
              <button
                type="button"
                id="priority-high-btn"
                onClick={() => setPriority('HIGH')}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${
                  priority === 'HIGH'
                    ? 'bg-[#FF3B30] text-[#111111] brutal-selected font-bold'
                    : 'bg-white text-[#111111] hover:bg-[#FF3B30]/20'
                }`}
              >
                HIGH
              </button>

              {/* MEDIUM: Yellow background + black text */}
              <button
                type="button"
                id="priority-medium-btn"
                onClick={() => setPriority('MEDIUM')}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${
                  priority === 'MEDIUM'
                    ? 'bg-[#FFD600] text-[#111111] brutal-selected font-bold'
                    : 'bg-white text-[#111111] hover:bg-[#FFD600]/20'
                }`}
              >
                MEDIUM
              </button>

              {/* LOW: Acid green background + black text */}
              <button
                type="button"
                id="priority-low-btn"
                onClick={() => setPriority('LOW')}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${
                  priority === 'LOW'
                    ? 'bg-[#B6FF00] text-[#111111] brutal-selected font-bold'
                    : 'bg-white text-[#111111] hover:bg-[#B6FF00]/20'
                }`}
              >
                LOW
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            id="add-task-submit-btn"
            className="brutal-btn flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] text-white font-display text-sm sm:text-base border-2 border-[#111111] cursor-pointer tracking-wider"
          >
            <span>ADD TASK</span>
            <Plus className="w-4 h-4 text-[#B6FF00]" strokeWidth={3} />
            <span className="font-mono-tech text-xs text-white/60 hidden sm:inline">↵</span>
          </button>
        </div>
      </form>
    </section>
  );
}
