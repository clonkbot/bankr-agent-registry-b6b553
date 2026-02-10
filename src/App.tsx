import { useState, useEffect } from 'react';
import AgentCard from './components/AgentCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

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

const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Transaction Analyzer',
    description: 'Analyzes bank transactions to detect patterns, categorize spending, and identify potential fraud.',
    category: 'Analytics',
    status: 'active',
    creator: 'bankr.core',
    createdAt: '2024-01-15',
    usageCount: 45230,
    tags: ['fraud-detection', 'spending', 'ml']
  },
  {
    id: 'agent-002',
    name: 'Budget Optimizer',
    description: 'Creates personalized budget recommendations based on income and spending habits.',
    category: 'Finance',
    status: 'active',
    creator: 'fintech.labs',
    createdAt: '2024-02-20',
    usageCount: 32100,
    tags: ['budgeting', 'recommendations', 'personal-finance']
  },
  {
    id: 'agent-003',
    name: 'Crypto Sentinel',
    description: 'Monitors cryptocurrency wallets and provides real-time alerts for significant movements.',
    category: 'Crypto',
    status: 'beta',
    creator: 'chain.watch',
    createdAt: '2024-03-10',
    usageCount: 18750,
    tags: ['crypto', 'monitoring', 'alerts']
  },
  {
    id: 'agent-004',
    name: 'Loan Qualifier',
    description: 'Pre-qualifies users for various loan products based on financial profile analysis.',
    category: 'Lending',
    status: 'active',
    creator: 'bankr.core',
    createdAt: '2024-01-28',
    usageCount: 67890,
    tags: ['loans', 'qualification', 'credit']
  },
  {
    id: 'agent-005',
    name: 'Investment Scout',
    description: 'Scans market opportunities and suggests investment strategies aligned with risk tolerance.',
    category: 'Investment',
    status: 'active',
    creator: 'wealth.ai',
    createdAt: '2024-02-05',
    usageCount: 29340,
    tags: ['investing', 'stocks', 'portfolio']
  },
  {
    id: 'agent-006',
    name: 'Tax Helper',
    description: 'Organizes transactions for tax reporting and identifies potential deductions.',
    category: 'Finance',
    status: 'beta',
    creator: 'tax.tech',
    createdAt: '2024-03-22',
    usageCount: 12450,
    tags: ['tax', 'deductions', 'reporting']
  },
  {
    id: 'agent-007',
    name: 'Subscription Tracker',
    description: 'Detects and manages recurring subscriptions, alerts on price changes and renewals.',
    category: 'Analytics',
    status: 'active',
    creator: 'sub.scan',
    createdAt: '2024-02-14',
    usageCount: 54200,
    tags: ['subscriptions', 'tracking', 'savings']
  },
  {
    id: 'agent-008',
    name: 'Merchant Intel',
    description: 'Provides insights about merchants including reviews, alternatives, and cashback opportunities.',
    category: 'Analytics',
    status: 'deprecated',
    creator: 'merchant.api',
    createdAt: '2023-11-10',
    usageCount: 8900,
    tags: ['merchants', 'cashback', 'reviews']
  },
  {
    id: 'agent-009',
    name: 'FX Oracle',
    description: 'Tracks foreign exchange rates and suggests optimal times for currency conversion.',
    category: 'Crypto',
    status: 'active',
    creator: 'forex.ai',
    createdAt: '2024-03-01',
    usageCount: 21340,
    tags: ['forex', 'currency', 'conversion']
  },
  {
    id: 'agent-010',
    name: 'Savings Autopilot',
    description: 'Automatically moves spare change and idle funds to high-yield savings accounts.',
    category: 'Finance',
    status: 'active',
    creator: 'save.smart',
    createdAt: '2024-01-05',
    usageCount: 78500,
    tags: ['savings', 'automation', 'high-yield']
  },
  {
    id: 'agent-011',
    name: 'Bill Negotiator',
    description: 'Analyzes recurring bills and suggests negotiation strategies to reduce costs.',
    category: 'Finance',
    status: 'beta',
    creator: 'deal.finder',
    createdAt: '2024-04-01',
    usageCount: 5600,
    tags: ['bills', 'negotiation', 'savings']
  },
  {
    id: 'agent-012',
    name: 'Credit Guardian',
    description: 'Monitors credit score changes and provides actionable improvement recommendations.',
    category: 'Lending',
    status: 'active',
    creator: 'credit.watch',
    createdAt: '2024-02-28',
    usageCount: 41200,
    tags: ['credit-score', 'monitoring', 'improvement']
  }
];

const categories = ['All', 'Analytics', 'Finance', 'Crypto', 'Lending', 'Investment'];

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAgents(mockAgents);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    beta: agents.filter(a => a.status === 'beta').length,
    totalUsage: agents.reduce((sum, a) => sum + a.usageCount, 0)
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 200, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 200, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-cyan-500/20 backdrop-blur-sm bg-[#0a0a0f]/80 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-lg md:text-xl">B</span>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">bankr</span>
                    <span className="text-white/60">.agents</span>
                  </h1>
                  <p className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest uppercase">Agent Registry v2.1</p>
                </div>
              </div>
              <div className="text-xs md:text-sm font-mono text-white/40 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="hidden sm:inline">SYSTEM ONLINE</span>
                <span className="sm:hidden">ONLINE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats bar */}
        <div className="border-b border-cyan-500/10 bg-[#0a0a0f]/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatBlock label="TOTAL AGENTS" value={stats.total} loading={isLoading} />
              <StatBlock label="ACTIVE" value={stats.active} color="text-emerald-400" loading={isLoading} />
              <StatBlock label="IN BETA" value={stats.beta} color="text-amber-400" loading={isLoading} />
              <StatBlock label="TOTAL CALLS" value={formatNumber(stats.totalUsage)} loading={isLoading} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 w-full">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-mono text-white/40">
              Showing <span className="text-cyan-400">{filteredAgents.length}</span> of {agents.length} agents
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1"
              >
                CLEAR SEARCH
              </button>
            )}
          </div>

          {/* Agent grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredAgents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20">
              <div className="text-4xl md:text-6xl mb-4 opacity-20">{"{ }"}</div>
              <p className="text-white/40 font-mono text-sm">NO AGENTS FOUND</p>
              <p className="text-white/20 font-mono text-xs mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-cyan-500/10 bg-[#0a0a0f]/80 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <p className="text-center text-white/30 text-[10px] md:text-xs font-mono">
              Requested by <span className="text-white/50">@vladyy__01</span> · Built by <span className="text-white/50">@clonkbot</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StatBlock({ label, value, color = 'text-white', loading }: {
  label: string;
  value: string | number;
  color?: string;
  loading: boolean;
}) {
  return (
    <div className="bg-white/[0.02] border border-cyan-500/10 rounded-lg p-3 md:p-4 hover:border-cyan-500/30 transition-colors">
      <p className="text-[10px] md:text-xs font-mono text-white/40 mb-1">{label}</p>
      {loading ? (
        <div className="h-6 md:h-8 w-16 bg-white/10 rounded animate-pulse" />
      ) : (
        <p className={`text-lg md:text-2xl font-bold font-mono ${color}`}>{value}</p>
      )}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

export default App;
