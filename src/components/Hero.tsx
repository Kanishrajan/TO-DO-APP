import ThreeFocusOrb from './ThreeFocusOrb';
import { ArrowDown, Plus } from 'lucide-react';

interface HeroProps {
  onAddTaskClick: () => void;
  taskCount: number;
  completedCount: number;
}

export default function Hero({ onAddTaskClick, taskCount, completedCount }: HeroProps) {
  return (
    <section className="relative w-full border-b-2 border-[#111111] bg-white overflow-hidden">
      {/* Decorative Bauhaus and Y2K micro-labels in background */}
      <div className="absolute top-3 right-6 hidden md:flex items-center gap-3 font-mono-tech text-[10px] text-[#111111]/60 tracking-wider pointer-events-none">
        <span>01 / FOCUS</span>
        <span>•</span>
        <span>02 / PLAN</span>
        <span>•</span>
        <span>03 / EXECUTE</span>
        <span>•</span>
        <span className="text-[#2457FF] font-bold">SYS.COORDS: 48°51&apos;N 2°20&apos;E</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Bold Typography & Editorial Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* System Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-white text-xs font-mono-tech mb-4 brutal-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD600]" />
              <span className="font-bold tracking-wider">FOCUSLIST // SYSTEM 01</span>
              <span className="text-white/50">|</span>
              <span className="text-[#B6FF00]">TASK MATRIX</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.92] text-[#111111] tracking-tight mb-6 uppercase">
              GET FOCUSED.
              <br />
              <span className="relative inline-block">
                GET THINGS DONE.
                {/* Subtle Bauhaus primary color underline mark */}
                <span className="absolute -bottom-2 left-0 w-32 h-1.5 bg-[#FF3B30]" />
              </span>
            </h1>

            {/* Sub-headline / Description */}
            <p className="font-body text-lg sm:text-xl text-[#111111] max-w-xl mb-8 leading-relaxed font-medium">
              A brutalist task manager designed for people who demand uncompromising clarity, zero digital noise, and rapid local execution.
            </p>

            {/* Call to Action and Micro Badges */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-add-task-btn"
                onClick={onAddTaskClick}
                className="brutal-btn flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#111111] text-white font-display text-sm sm:text-base tracking-wider border-2 border-[#111111] cursor-pointer"
              >
                <Plus className="w-5 h-5 text-[#B6FF00]" strokeWidth={3} />
                <span>+ ADD TASK</span>
              </button>

              <button
                id="hero-scroll-btn"
                onClick={onAddTaskClick}
                className="brutal-btn flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-[#111111] font-mono-tech text-xs sm:text-sm font-bold border-2 border-[#111111] cursor-pointer"
              >
                <span>EXPLORE MATRIX</span>
                <ArrowDown className="w-4 h-4 text-[#2457FF]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Micro Bauhaus geometric composition */}
            <div className="mt-8 pt-6 border-t border-[#111111]/20 w-full flex items-center justify-between text-xs font-mono-tech text-[#111111]/75">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#FF3B30] inline-block border border-[#111111]" />
                <span className="w-3 h-3 rounded-full bg-[#FFD600] inline-block border border-[#111111]" />
                <span className="w-3 h-3 bg-[#0047FF] inline-block border border-[#111111] rotate-45" />
                <span className="hidden sm:inline font-bold">BAUHAUS GEOMETRY × Y2K FUTURISM</span>
              </div>
              <div className="font-bold text-[#111111]">
                {taskCount} TASKS LOADED ({completedCount} DONE)
              </div>
            </div>
          </div>

          {/* Right Column: 3D Object Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] bg-[#F5F5F0] border-2 border-[#111111] brutal-shadow p-3 scanline-effect">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2 mb-2 bg-white px-2 py-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#FF3B30] border border-[#111111] inline-block" />
                  <span className="w-3 h-3 bg-[#FFD600] border border-[#111111] inline-block" />
                  <span className="w-3 h-3 bg-[#B6FF00] border border-[#111111] inline-block" />
                  <span className="font-mono-tech text-[10px] font-bold tracking-wider ml-1 text-[#111111]">
                    FOCUS_ORB_V1.OBJ
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono-tech text-[9px] text-[#111111]/80">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2457FF] animate-ping" />
                  <span>LIVE 3D</span>
                </div>
              </div>

              {/* 3D Canvas Visual */}
              <div className="bg-white border-2 border-[#111111] relative overflow-hidden">
                <ThreeFocusOrb />

                {/* Subtle Y2K Coordinates overlay */}
                <div className="absolute top-2 right-2 bg-white/90 border border-[#111111] px-1.5 py-0.5 font-mono-tech text-[8px] text-[#111111] pointer-events-none">
                  FPS: 60 // PBR
                </div>
              </div>

              {/* Window Footer / Technical specs */}
              <div className="mt-2 flex items-center justify-between font-mono-tech text-[10px] text-[#111111] px-1 font-semibold">
                <span>INTERACTIVE CANVAS</span>
                <span className="text-[#2457FF] font-bold">DRAG TO TILT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
