interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'beta' | 'deprecated';
  creator: string;
  createdAt: string;
  usageCount: number;
  tags: string[];
}

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const statusConfig = {
    active: { color: 'bg-emerald-400', text: 'ACTIVE', textColor: 'text-emerald-400' },
    beta: { color: 'bg-amber-400', text: 'BETA', textColor: 'text-amber-400' },
    deprecated: { color: 'bg-red-400', text: 'DEPRECATED', textColor: 'text-red-400' }
  };

  const status = statusConfig[agent.status];

  return (
    <div
      className="group relative bg-gradient-to-br from-white/[0.05] to-transparent border border-cyan-500/10 rounded-xl p-4 md:p-5 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,200,0.1)] cursor-pointer overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/5 group-hover:to-emerald-400/5 transition-all duration-300 pointer-events-none" />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
              <span className={`text-[10px] font-mono ${status.textColor} tracking-wider`}>{status.text}</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
              {agent.name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">CALLS</p>
            <p className="text-sm md:text-base font-bold font-mono text-white/80">{formatNumber(agent.usageCount)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-white/50 mb-4 line-clamp-3 leading-relaxed">
          {agent.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-cyan-400/10 text-cyan-300/70 text-[10px] font-mono rounded-full border border-cyan-400/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white/70">
                {agent.creator.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/40">{agent.creator}</span>
          </div>
          <span className="text-[10px] font-mono text-white/30">
            {formatDate(agent.createdAt)}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4 md:top-5 md:right-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-white/5 text-[10px] font-mono text-white/50 rounded border border-white/10">
            {agent.category}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
