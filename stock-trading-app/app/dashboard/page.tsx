import { Sidebar } from '@/components/dashboard/Sidebar';
import { PortfolioCards } from '@/components/dashboard/PortfolioCards';
import { StockChart } from '@/components/dashboard/StockChart';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { Watchlist } from '@/components/dashboard/Watchlist';
import { NewsFeed } from '@/components/dashboard/NewsFeed';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back! Here's your portfolio overview.</p>
            </div>

            {/* Portfolio Cards */}
            <PortfolioCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <StockChart />
                <AIRecommendations />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <Watchlist />
                <NewsFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}