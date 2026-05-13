'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';
import { Portfolio } from '@/types';

const cards = [
  {
    title: 'Total Balance',
    key: 'totalBalance' as keyof Portfolio,
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'Daily P&L',
    key: 'dailyPnL' as keyof Portfolio,
    icon: TrendingUp,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Invested Amount',
    key: 'investedAmount' as keyof Portfolio,
    icon: PieChart,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'Returns %',
    key: 'returnsPercent' as keyof Portfolio,
    icon: TrendingUp,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    isPercentage: true
  }
];

export function PortfolioCards() {
  const { portfolio } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const value = portfolio[card.key];
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              {card.key === 'dailyPnL' && (
                <div className={`flex items-center ${getChangeColor(value as number)}`}>
                  {(value as number) >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold text-white">
                {card.isPercentage
                  ? formatPercentage(value as number)
                  : formatCurrency(value as number)
                }
              </p>
              {card.key === 'returnsPercent' && (
                <p className={`text-sm ${getChangeColor(value as number)}`}>
                  {(value as number) >= 0 ? '+' : ''}{formatCurrency(portfolio.returns)}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}