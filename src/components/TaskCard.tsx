import React from 'react';
import { Task, Priority } from '../types';
import { Pencil, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!task.completed) {
      // Small celebratory confetti burst for completing a task
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#FF3B30', '#FFD600', '#2457FF', '#B6FF00', '#FF3CAC'],
        disableForReducedMotion: true,
      });
    }
    onToggleComplete(task.id);
  };

  const getPriorityBadge = (prio: Priority) => {
    switch (prio) {
      case 'HIGH':
        return (
          <span className="font-display text-[11px] px-2.5 py-1 bg-[#FF3B30] text-[#111111] border-2 border-[#111111] font-bold tracking-wider">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="font-display text-[11px] px-2.5 py-1 bg-[#FFD600] text-[#111111] border-2 border-[#111111] font-bold tracking-wider">
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="font-display text-[11px] px-2.5 py-1 bg-[#B6FF00] text-[#111111] border-2 border-[#111111] font-bold tracking-wider">
            LOW
          </span>
        );
    }
  };

  // Format date helper
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      id={`task-card-${task.id}`}
      className={`group relative bg-white border-2 sm:border-3 border-[#111111] p-4 sm:p-5 brutal-shadow transition-all duration-150 ${
        task.completed ? 'opacity-75 bg-[#F5F5F0]/60' : 'hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Custom Brutalist Checkbox + Title */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Custom Brutalist Checkbox */}
          <button
            type="button"
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'completed'}`}
            onClick={handleToggle}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleToggle(e);
              }
            }}
            id={`checkbox-${task.id}`}
            className={`mt-0.5 flex-shrink-0 w-6 h-6 border-2 border-[#111111] flex items-center justify-center transition-all cursor-pointer ${
              task.completed
                ? 'bg-[#111111] text-[#B6FF00] scale-100'
                : 'bg-white hover:bg-[#F5F5F0]'
            }`}
          >
            {task.completed ? (
              <span className="font-display text-sm leading-none select-none text-[#B6FF00]">
                ■
              </span>
            ) : (
              <span className="text-[#111111]/30 font-mono text-xs select-none">
                □
              </span>
            )}
          </button>

          {/* Title and Metadata */}
          <div className="flex-1 min-w-0">
            <h3
              onClick={handleToggle}
              className={`font-body font-bold text-base sm:text-lg leading-snug break-words cursor-pointer select-none transition-all ${
                task.completed
                  ? 'line-through text-[#111111]/50 decoration-2 decoration-[#111111]'
                  : 'text-[#111111] hover:text-[#2457FF]'
              }`}
            >
              {task.title}
            </h3>

            {/* Micro timestamp & ID */}
            <div className="mt-1 flex items-center gap-2 font-mono-tech text-[10px] text-[#111111]/60">
              <span>{task.id.slice(0, 8).toUpperCase()}</span>
              <span>•</span>
              <span>LOGGED {formattedDate}</span>
              {task.completed && (
                <>
                  <span>•</span>
                  <span className="text-[#0047FF] font-bold">DONE</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Priority Block on Top Right for Mobile or Desktop */}
        <div className="flex-shrink-0">
          {getPriorityBadge(task.priority)}
        </div>
      </div>

      {/* Bottom Bar: Action buttons and status */}
      <div className="mt-4 pt-3 border-t border-[#111111]/15 flex items-center justify-between">
        <div className="font-mono-tech text-[10px] text-[#111111]/70 font-semibold">
          {task.completed ? 'STATUS // ARCHIVED' : 'STATUS // ACTIVE'}
        </div>

        <div className="flex items-center gap-2">
          <button
            id={`task-edit-${task.id}`}
            onClick={() => onEdit(task)}
            className="px-2.5 py-1 bg-white hover:bg-[#F5F5F0] border-2 border-[#111111] font-mono-tech text-xs font-bold text-[#111111] brutal-shadow-sm flex items-center gap-1 cursor-pointer transition-transform"
          >
            <Pencil className="w-3 h-3 text-[#2457FF]" />
            <span>EDIT</span>
          </button>

          <button
            id={`task-delete-${task.id}`}
            onClick={() => onDelete(task.id)}
            className="px-2.5 py-1 bg-white hover:bg-[#FF3B30]/15 border-2 border-[#111111] font-mono-tech text-xs font-bold text-[#FF3B30] brutal-shadow-sm flex items-center gap-1 cursor-pointer transition-transform"
          >
            <Trash2 className="w-3 h-3" />
            <span>DELETE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
