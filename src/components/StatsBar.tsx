import { TaskStats } from '../types';

interface StatsBarProps {
  stats: TaskStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="w-full">
      {/* 3 Bold Bauhaus-Inspired Statistic Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Card 1: TOTAL (Blue geometric accent block) */}
        <div className="relative group">
          {/* Offset geometric accent behind card */}
          <div className="absolute inset-0 bg-[#0047FF] translate-x-1.5 translate-y-1.5 border-2 border-[#111111]" />
          <div className="relative bg-white border-2 border-[#111111] p-5 brutal-shadow transition-transform">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#111111] pb-2">
              <span className="font-mono-tech text-xs font-bold tracking-widest text-[#111111]">
                [ 01 ] TOTAL
              </span>
              <span className="w-3 h-3 bg-[#0047FF] border border-[#111111] inline-block" />
            </div>
            <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none mb-1">
              {stats.total.toString().padStart(2, '0')}
            </div>
            <div className="font-mono-tech text-[10px] text-[#111111]/70 tracking-wider">
              ALL REGISTERED TASKS
            </div>
          </div>
        </div>

        {/* Card 2: COMPLETED (Acid Green geometric accent block) */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#B6FF00] translate-x-1.5 translate-y-1.5 border-2 border-[#111111]" />
          <div className="relative bg-white border-2 border-[#111111] p-5 brutal-shadow transition-transform">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#111111] pb-2">
              <span className="font-mono-tech text-xs font-bold tracking-widest text-[#111111]">
                [ 02 ] COMPLETED
              </span>
              <span className="w-3 h-3 rounded-full bg-[#B6FF00] border border-[#111111] inline-block" />
            </div>
            <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none mb-1">
              {stats.completed.toString().padStart(2, '0')}
            </div>
            <div className="font-mono-tech text-[10px] text-[#111111]/70 tracking-wider">
              SUCCESSFULLY FINISHED
            </div>
          </div>
        </div>

        {/* Card 3: PENDING (Solar Yellow geometric accent block) */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FFD600] translate-x-1.5 translate-y-1.5 border-2 border-[#111111]" />
          <div className="relative bg-white border-2 border-[#111111] p-5 brutal-shadow transition-transform">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#111111] pb-2">
              <span className="font-mono-tech text-xs font-bold tracking-widest text-[#111111]">
                [ 03 ] PENDING
              </span>
              <span className="w-3 h-3 bg-[#FFD600] border border-[#111111] rotate-45 inline-block" />
            </div>
            <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none mb-1">
              {stats.pending.toString().padStart(2, '0')}
            </div>
            <div className="font-mono-tech text-[10px] text-[#111111]/70 tracking-wider">
              REQUIRING ACTIVE FOCUS
            </div>
          </div>
        </div>

      </div>

      {/* Brutalist Completion Progress Gauge */}
      <div className="mt-6 bg-white border-2 border-[#111111] p-3 sm:p-4 brutal-shadow flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-xs">
        <div className="flex items-center gap-2 font-bold w-full sm:w-auto">
          <span className="w-2.5 h-2.5 bg-[#111111] inline-block" />
          <span>VELOCITY GAUGE:</span>
          <span className="text-[#2457FF]">{completionPercentage}% RATIO</span>
        </div>

        {/* Custom Brutalist Block Progress Bar */}
        <div className="w-full sm:w-1/2 flex items-center h-5 border-2 border-[#111111] bg-[#F5F5F0] overflow-hidden p-0.5">
          <div
            className="h-full bg-[#111111] transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="text-[11px] font-semibold text-[#111111]/80 whitespace-nowrap">
          STATUS: {stats.pending === 0 && stats.total > 0 ? 'MATRIX CLEAR ⚡' : 'PROCESSING'}
        </div>
      </div>
    </div>
  );
}
