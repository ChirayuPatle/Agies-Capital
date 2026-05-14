'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/stores/useStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { PortfolioCards } from '@/components/dashboard/PortfolioCards';
import { StockChart } from '@/components/dashboard/StockChart';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { Watchlist } from '@/components/dashboard/Watchlist';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { SearchBar } from '@/components/common/SearchBar';
import { LiveModeToggle } from '@/components/common/LiveModeToggle';
import { NotificationsPanel } from '@/components/common/NotificationsPanel';
import { PriceAlerts } from '@/components/common/PriceAlerts';

export default function Dashboard() {
  const { isAuthenticated, fetchStocks, fetchPortfolio, fetchOrders, fetchTransactions, isLiveMode } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      // Fetch initial data
      fetchStocks();
      fetchPortfolio();
      fetchOrders();
      fetchTransactions();

      // Only set up periodic updates if not in live mode
      if (!isLiveMode) {
        const interval = setInterval(() => {
          fetchStocks();
          fetchPortfolio();
          fetchOrders();
        }, 30000); // Update every 30 seconds when not in live mode

        return () => clearInterval(interval);
      }
    }
  }, [isAuthenticated, router, fetchStocks, fetchPortfolio, fetchOrders, fetchTransactions, isLiveMode]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="relative overflow-hidden p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),transparent_30%)]" />
          <div className="max-w-7xl mx-auto relative">
            <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.26em] text-emerald-400">Live market pulse</p>
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Dashboard</h1>
                  <p className="max-w-2xl text-sm leading-6 text-slate-400">View your portfolio snapshot, track watchlist movers, and keep alerts ready for the next market move.</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isLiveMode ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    {isLiveMode ? 'Live market updates' : 'Snapshot mode'}
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-emerald-300">AI-driven</span>
                    <span className="rounded-full bg-slate-700/80 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">Smooth trading</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">
                <div>
                  <SearchBar />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <LiveModeToggle />
                  <NotificationsPanel />
                </div>
              </div>
            </div>

            <PortfolioCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <StockChart />
                <AIRecommendations />
              </div>

              <div className="space-y-8">
                <Watchlist />
                <PriceAlerts />
                <NewsFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}