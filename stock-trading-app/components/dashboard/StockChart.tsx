'use client';

import { motion } from 'framer-motion';
import { mockChartData } from '@/data/mockData';

export function StockChart() {
  // Simple SVG chart for now
  const data = mockChartData;
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const range = maxPrice - minPrice;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.close - minPrice) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass rounded-xl p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">AAPL - Apple Inc.</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">$175.43</div>
          <div className="text-sm text-green-400">+2.15 (+1.24%)</div>
        </div>
      </div>

      <div className="h-64 w-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points={points}
          />

          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            fill="url(#chartGradient)"
            points={`0,100 ${points} 100,100`}
          />
        </svg>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-2">
        {data.map((d, i) => (
          <span key={i}>{d.time}</span>
        ))}
      </div>
    </motion.div>
  );
}