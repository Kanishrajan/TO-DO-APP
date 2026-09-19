export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 sm:border-t-3 border-[#111111] mt-16 sm:mt-24 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Decorative Bauhaus Composition Divider */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/20">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF3B30] border border-[#111111] inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFD600] border border-[#111111] inline-block" />
            <span className="w-3.5 h-3.5 bg-[#0047FF] border border-[#111111] rotate-45 inline-block" />
            <span className="w-8 h-1 bg-[#111111] inline-block" />
            <span className="font-mono-tech text-xs font-bold text-[#111111]">
              BAUHAUS GRID // ED.2026
            </span>
          </div>

          <div className="font-mono-tech text-[11px] text-[#111111]/70 font-semibold hidden sm:block">
            SYS.STATUS: OPERATIONAL
          </div>
        </div>

        {/* Core Brutalist Editorial Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#111111] inline-block" />
              <h4 className="font-display text-2xl sm:text-3xl text-[#111111] tracking-tight">
                FOCUSLIST
              </h4>
            </div>
            <p className="font-display text-lg text-[#111111] tracking-tight leading-snug uppercase">
              SIMPLE TASKS.
              <br />
              CLEAR FOCUS.
            </p>
            <p className="font-body text-sm text-[#111111]/70 max-w-sm">
              Engineered for intentional minds who prefer tangible visual impact over generic enterprise software clutter.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4">
            <div className="font-mono-tech text-xs text-[#111111] space-y-1 md:text-right">
              <div className="font-bold tracking-wider">
                REACT × VITE × LOCAL STORAGE
              </div>
              <div className="text-[#111111]/60">
                THREE.JS INTERACTIVE PBR ORB
              </div>
              <div className="text-[#2457FF] font-bold">
                PERSISTENCE ENGINE: HTML5 STORAGE API
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F5F0] border-2 border-[#111111] font-mono-tech text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#B6FF00] border border-[#111111]" />
              <span>100% CLIENT-SIDE &amp; PRIVATE</span>
            </div>
          </div>

        </div>

        {/* Bottom micro line */}
        <div className="pt-6 border-t border-[#111111]/15 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono-tech text-[10px] text-[#111111]/50">
          <span>&copy; {new Date().getFullYear()} FOCUSLIST DIGITAL PRODUCT // SYSTEM 01</span>
          <span>COORDINATES: LAT 48.8566° N, LON 2.3522° E</span>
        </div>

      </div>
    </footer>
  );
}
