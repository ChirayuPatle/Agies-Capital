'use client';

import { motion } from 'framer-motion';
import { Brain, BarChart3, Bell, BookOpen, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get intelligent buy/sell recommendations with confidence scores and market sentiment analysis.',
    color: 'text-purple-400'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive portfolio analytics with risk assessment and performance tracking.',
    color: 'text-blue-400'
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Instant notifications for price movements, news, and trading opportunities.',
    color: 'text-emerald-400'
  },
  {
    icon: BookOpen,
    title: 'Paper Trading',
    description: 'Practice trading with virtual money to hone your skills without financial risk.',
    color: 'text-orange-400'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-grade security with encrypted transactions and multi-factor authentication.',
    color: 'text-green-400'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time data streaming with sub-second latency for instant order execution.',
    color: 'text-yellow-400'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for Modern Traders
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to make informed investment decisions with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg bg-slate-800 mb-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}