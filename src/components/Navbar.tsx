interface NavbarProps {
  onOpenAbout: () => void;
  onScrollToTasks: () => void;
  taskCount: number;
}

export default function Navbar({ onOpenAbout, onScrollToTasks, taskCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-2 border-[#111111] px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#111111] flex items-center justify-center border border-[#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B6FF00] inline-block animate-pulse" />
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left font-display text-lg sm:text-xl tracking-tight text-[#111111] hover:text-[#2457FF] transition-colors"
          >
            FOCUSLIST
          </button>
          <span className="hidden sm:inline-block font-mono-tech text-[11px] px-1.5 py-0.5 border border-[#111111] bg-[#F5F5F0] text-[#111111] font-semibold">
            SYS.01
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono-tech text-xs">
          <button
            id="nav-tasks-btn"
            onClick={onScrollToTasks}
            className="px-2.5 py-1 text-[#111111] hover:bg-[#F5F5F0] border border-transparent hover:border-[#111111] font-semibold transition-all"
          >
            TASKS ({taskCount})
          </button>

          <button
            id="nav-about-btn"
            onClick={onOpenAbout}
            className="px-2.5 py-1 text-[#111111] hover:bg-[#F5F5F0] border border-transparent hover:border-[#111111] font-semibold transition-all flex items-center gap-1"
          >
            ABOUT
            <span className="w-1.5 h-1.5 bg-[#FF3B30] inline-block rounded-full" />
          </button>

          {/* Local Storage Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F5F0] border border-[#111111] text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#B6FF00] border border-[#111111] inline-block shadow-[0_0_5px_#B6FF00]" />
            <span className="hidden xs:inline text-[#111111]">LOCAL</span>
            <span className="text-[#111111]">●</span>
            <span className="text-[#111111] font-mono">ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
