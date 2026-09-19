interface EmptyStateProps {
  onCreateClick: () => void;
  isFiltered?: boolean;
}

export default function EmptyState({ onCreateClick, isFiltered }: EmptyStateProps) {
  return (
    <div className="w-full bg-white border-2 sm:border-3 border-[#111111] p-8 sm:p-12 brutal-shadow text-center flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Bauhaus Animated Geometric Composition */}
      <div className="relative w-48 h-32 mb-6 flex items-center justify-center">
        {/* Yellow Circle ● */}
        <div className="absolute top-2 left-10 w-8 h-8 rounded-full bg-[#FFD600] border-2 border-[#111111] animate-bounce [animation-duration:3s]" />

        {/* Hot Pink Small Square ■ */}
        <div className="absolute top-4 right-10 w-6 h-6 bg-[#FF3CAC] border-2 border-[#111111] rotate-12 transition-transform duration-500 hover:rotate-45" />

        {/* Thick Black Line ━━━━━━━━━ */}
        <div className="absolute top-1/2 left-4 right-4 h-2 bg-[#111111]" />

        {/* Blue Triangle ▲ */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-[#0047FF] filter drop-shadow-[2px_2px_0_#111111]"
        />

        {/* Acid Green Pill Accent */}
        <div className="absolute bottom-4 left-6 w-5 h-2.5 bg-[#B6FF00] border border-[#111111]" />
        
        {/* Signal Red Small Dot */}
        <div className="absolute top-1/2 right-6 w-3 h-3 bg-[#FF3B30] border border-[#111111] -translate-y-1/2" />
      </div>

      {/* Headline */}
      <h3 className="font-display text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight mb-2">
        {isFiltered ? 'NO MATCHING TASKS FOUND.' : 'NOTHING HERE YET.'}
      </h3>

      {/* Supporting Text */}
      <p className="font-body text-sm sm:text-base text-[#111111]/70 max-w-md mb-6 font-medium">
        {isFiltered
          ? 'No tasks match your active filters or search query. Try clearing filters or creating a new item.'
          : 'Create a task and turn intention into action. Clear focus starts with a single recorded intent.'}
      </p>

      {/* Button: + CREATE TASK */}
      <button
        id="empty-state-create-btn"
        onClick={onCreateClick}
        className="brutal-btn px-6 py-3 bg-[#111111] text-white font-display text-sm tracking-wider border-2 border-[#111111] cursor-pointer"
      >
        + CREATE TASK
      </button>

      {/* Technical footer in empty state */}
      <div className="mt-8 pt-4 border-t border-[#111111]/10 w-full font-mono-tech text-[10px] text-[#111111]/50">
        FOCUSLIST // BUFFER CLEAR // READY FOR INPUT
      </div>
    </div>
  );
}
