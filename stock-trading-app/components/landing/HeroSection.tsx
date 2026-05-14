'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { mockMarketIndices } from '@/data/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0">
          {/* Animated stock chart lines */}
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <motion.path
              d="M0,300 Q250,200 500,250 T1000,300"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,350 Q300,280 600,320 T1000,350"
              stroke="rgba(239, 68, 68, 0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,400 Q200,350 400,380 T1000,400"
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Trade Smarter with
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              {' '}AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the future of investing with AI-powered insights,
            real-time analytics, and premium trading tools designed for modern investors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg" asChild>
            <a href="/auth/signup">
              Start Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg" asChild>
            <a href="/auth/login">
              Sign In
              <TrendingUp className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        {/* Live Market Indices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {mockMarketIndices.map((index, i) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="glass rounded-xl p-4 backdrop-blur-md border border-white/20"
            >
              <div className="text-sm text-gray-300 mb-1">{index.name}</div>
              <div className="text-lg font-semibold text-white">
                {formatCurrency(index.value)}
              </div>
              <div className={`text-sm flex items-center justify-center ${getChangeColor(index.change)}`}>
                <span className="mr-1">{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}</span>
                <span>({formatPercentage(index.changePercent)})</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating AI Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-20 right-10 hidden lg:block"
      >
        <div className="glass rounded-full p-4">
          <Zap className="h-8 w-8 text-emerald-400" />
        </div>
      </motion.div>
    </section>
  );
}