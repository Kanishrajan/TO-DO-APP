import { FilterStatus, PriorityFilter } from '../types';
import { Search, X, Trash2, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: FilterStatus;
  onStatusFilterChange: (status: FilterStatus) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (priority: PriorityFilter) => void;
  completedCount: number;
  onClearCompleted: () => void;
  onResetSampleTasks: () => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  completedCount,
  onClearCompleted,
  onResetSampleTasks,
}: FilterBarProps) {
  return (
    <div className="w-full bg-white border-2 border-[#111111] p-4 sm:p-5 brutal-shadow space-y-4">
      {/* Top row: Search input & quick batch actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#111111]/60" />
          </div>
          <input
            id="search-tasks-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH TASKS..."
            className="w-full bg-[#F5F5F0] border-2 border-[#111111] pl-9 pr-8 py-2 font-mono-tech text-xs sm:text-sm font-semibold text-[#111111] placeholder-[#111111]/50 outline-none focus:bg-white focus:shadow-[3px_3px_0_#111111]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#111111] hover:text-[#FF3B30]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-mono-tech text-xs">
          {completedCount > 0 && (
            <button
              id="clear-completed-btn"
              onClick={onClearCompleted}
              className="px-3 py-2 bg-white text-[#FF3B30] border-2 border-[#111111] font-bold brutal-shadow-sm hover:bg-[#FF3B30]/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>PURGE DONE ({completedCount})</span>
            </button>
          )}
          <button
            id="reset-sample-btn"
            onClick={onResetSampleTasks}
            className="px-2.5 py-2 bg-[#F5F5F0] text-[#111111] border-2 border-[#111111] font-bold hover:bg-white flex items-center gap-1 cursor-pointer"
            title="Reload default sample matrix"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">DEMO DATA</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Filter selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[#111111]/20">
        
        {/* Status Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider mr-1">
            STATUS:
          </span>
          {(['ALL', 'ACTIVE', 'COMPLETED'] as FilterStatus[]).map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                id={`filter-status-${status.toLowerCase()}`}
                onClick={() => onStatusFilterChange(status)}
                className={`px-3 py-1.5 text-xs font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white brutal-selected'
                    : 'bg-white text-[#111111] hover:bg-[#F5F5F0]'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider mr-1">
            PRIORITY:
          </span>
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as PriorityFilter[]).map((prio) => {
            const isSelected = priorityFilter === prio;
            return (
              <button
                key={prio}
                id={`filter-prio-${prio.toLowerCase()}`}
                onClick={() => onPriorityFilterChange(prio)}
                className={`px-3 py-1.5 text-xs font-display tracking-wider border-2 border-[#111111] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white brutal-selected'
                    : 'bg-white text-[#111111] hover:bg-[#F5F5F0]'
                }`}
              >
                {prio}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
