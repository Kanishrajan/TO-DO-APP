import { Check, X, ArrowRight } from 'lucide-react';
import { Task } from '../types';

interface FocusModeProps {
  task: Task | null;
  onComplete: (id: string) => void;
  onClose: () => void;
}

export default function FocusMode({
  task,
  onComplete,
  onClose,
}: FocusModeProps) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#111111] text-white flex items-center justify-center p-6">
      <button
        onClick={onClose}
        aria-label="Close focus mode"
        className="absolute top-6 right-6 w-11 h-11 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
      >
        <X size={20} />
      </button>

      <div className="w-full max-w-3xl">

        <div className="font-mono-tech text-xs tracking-[0.25em] text-[#B6FF00] mb-6">
          FOCUS MODE // ACTIVE TASK
        </div>

        <div className="border-2 border-white p-6 sm:p-10">

          <div className="flex justify-between items-center mb-10">
            <span className="font-mono-tech text-xs">
              PRIORITY
            </span>

            <span className="bg-[#B6FF00] text-black border-2 border-white px-3 py-1 font-bold text-xs">
              {task.priority}
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl leading-tight">
            {task.title}
          </h2>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">

            <button
              onClick={() => onComplete(task.id)}
              className="flex-1 bg-[#B6FF00] text-black border-2 border-white px-5 py-4 font-bold flex items-center justify-center gap-2 hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <Check size={20} />
              COMPLETE TASK
            </button>

            <button
              onClick={onClose}
              className="border-2 border-white px-5 py-4 font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              BACK TO LIST
              <ArrowRight size={18} />
            </button>

          </div>
        </div>

        <p className="mt-5 font-mono-tech text-xs text-white/50">
          One task. One objective. Zero distractions.
        </p>

      </div>
    </div>
  );
}