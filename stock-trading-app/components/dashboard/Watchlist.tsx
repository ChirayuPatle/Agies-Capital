'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';

export function Watchlist() {
  const { watchlist, toggleWatchlist } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass rounded-xl p-6 mb-8"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Watchlist</h3>

      <div className="space-y-3">
        {watchlist.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleWatchlist(stock.symbol)}
                className={`p-1 rounded mr-3 ${
                  stock.isInWatchlist
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Star className={`h-4 w-4 ${stock.isInWatchlist ? 'fill-current' : ''}`} />
              </button>

              <div>
                <div className="text-white font-semibold">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-semibold">
                {formatCurrency(stock.price)}
              </div>
              <div className={`text-sm flex items-center ${getChangeColor(stock.change)}`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {formatPercentage(stock.changePercent)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {watchlist.length === 0 && (
        <div className="text-center py-8">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Your watchlist is empty</p>
          <p className="text-sm text-gray-500">Add stocks to track their performance</p>
        </div>
      )}
    </motion.div>
  );
}