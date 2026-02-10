interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity" />

      <div className="relative flex items-center bg-[#0a0a0f] border border-cyan-500/20 rounded-xl overflow-hidden group-hover:border-cyan-500/40 group-focus-within:border-cyan-400/60 transition-colors">
        {/* Search icon */}
        <div className="pl-4 md:pl-5 pr-2 md:pr-3 text-white/30 group-focus-within:text-cyan-400 transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search agents by name, description, or tags..."
          className="flex-1 bg-transparent py-3 md:py-4 pr-4 text-sm md:text-base text-white placeholder:text-white/30 font-mono focus:outline-none"
        />

        {/* Keyboard shortcut hint - desktop only */}
        {!value && (
          <div className="hidden md:flex pr-4 items-center gap-1 text-white/20 text-xs font-mono">
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">/</kbd>
            <span>to search</span>
          </div>
        )}

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="pr-4 text-white/40 hover:text-white transition-colors p-2"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Terminal-style decorative cursor */}
      <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400/50 animate-pulse opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" style={{ left: '48px' }} />
    </div>
  );
}
