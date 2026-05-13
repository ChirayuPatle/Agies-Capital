'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react';
import { mockAIRecommendations } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';

export function AIRecommendations() {
  const getSignalColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'text-green-400 bg-green-500/10';
      case 'SELL': return 'text-red-400 bg-red-500/10';
      case 'HOLD': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getSignalIcon = (action: string) => {
    switch (action) {
      case 'BUY': return TrendingUp;
      case 'SELL': return TrendingDown;
      case 'HOLD': return Minus;
      default: return Minus;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass rounded-xl p-6 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg mr-3">
          <Brain className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {mockAIRecommendations.map((rec, index) => {
          const Icon = getSignalIcon(rec.action);
          const colorClass = getSignalColor(rec.action);

          return (
            <motion.div
              key={rec.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-4 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-white font-semibold">{rec.symbol}</div>
                  <div className="text-sm text-gray-400">{rec.reasoning}</div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold ${colorClass.split(' ')[0]}`}>
                  {rec.action}
                </div>
                <div className="text-sm text-gray-400">
                  {(rec.confidence * 100).toFixed(0)}% confidence
                </div>
                {rec.targetPrice && (
                  <div className="text-xs text-gray-500">
                    Target: {formatCurrency(rec.targetPrice)}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <p className="text-sm text-gray-300 text-center">
          AI recommendations are for informational purposes only. Always do your own research.
        </p>
      </div>
    </motion.div>
  );
}