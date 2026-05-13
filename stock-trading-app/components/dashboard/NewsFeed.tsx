'use client';

import { motion } from 'framer-motion';
import { Newspaper, ExternalLink } from 'lucide-react';
import { mockNews } from '@/data/mockData';
import { formatDate } from '@/utils/formatters';

export function NewsFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
          <Newspaper className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Market News</h3>
      </div>

      <div className="space-y-4">
        {mockNews.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-medium mb-2">{news.title}</h4>
                <p className="text-gray-300 text-sm mb-3">{news.summary}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <span className="mr-4">{news.source}</span>
                  <span>{formatDate(news.timestamp)}</span>
                  <span className={`ml-4 px-2 py-1 rounded text-xs ${
                    news.sentiment === 'positive'
                      ? 'bg-green-500/20 text-green-400'
                      : news.sentiment === 'negative'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {news.sentiment}
                  </span>
                </div>
              </div>
              {news.url && (
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
          Load More News →
        </button>
      </div>
    </motion.div>
  );
}