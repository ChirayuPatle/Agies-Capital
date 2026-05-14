'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';

export function Watchlist() {
  const { watchlist, toggleWatchlist, stocks } = useStore();

  const displayedWatchlist = watchlist
    .filter(item => item.isInWatchlist)
    .map(item => stocks.find(stock => stock.symbol === item.symbol))
    .filter(Boolean) as typeof stocks;

  const addToWatchlist = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock && !watchlist.some(item => item.symbol === symbol)) {
      // Add to watchlist if not already there
      toggleWatchlist(symbol);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass rounded-xl border border-white/10 p-6 mb-8 shadow-2xl shadow-slate-950/20"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Watchlist</h3>
          <p className="text-sm text-slate-400">{displayedWatchlist.length} stocks being tracked</p>
        </div>

        <select
          className="min-w-[170px] rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-white shadow-sm shadow-black/10"
          onChange={(e) => {
            if (e.target.value) {
              addToWatchlist(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Add stock...</option>
          {stocks
            .filter(stock => !watchlist.some(item => item.symbol === stock.symbol && item.isInWatchlist))
            .map(stock => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-3">
        {displayedWatchlist.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm shadow-slate-950/10 transition hover:border-emerald-500/20"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWatchlist(stock.symbol)}
                className="rounded-full border border-slate-700 bg-slate-950/90 p-2 text-amber-300 transition hover:border-amber-400 hover:text-amber-200"
                aria-label="Toggle watchlist"
              >
                <Star className="h-4 w-4" />
              </button>

              <div>
                <div className="text-white font-semibold">{stock.symbol}</div>
                <div className="text-sm text-slate-400">{stock.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-semibold">{formatCurrency(stock.price)}</div>
              <div className={`mt-1 flex items-center justify-end text-sm ${getChangeColor(stock.change)}`}>
                {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {formatPercentage(stock.changePercent)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {displayedWatchlist.length === 0 && (
        <div className="text-center py-10">
          <Star className="mx-auto h-12 w-12 text-slate-500" />
          <p className="mt-4 text-white">Your watchlist is empty</p>
          <p className="mt-1 text-sm text-slate-400">Add symbols to monitor price action instantly.</p>
        </div>
      )}
    </motion.div>
  );
}