'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Basic market data',
      '5 AI recommendations/month',
      'Paper trading',
      'Basic charts',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '₹999',
    period: 'month',
    description: 'For serious traders',
    features: [
      'Real-time market data',
      'Unlimited AI recommendations',
      'Advanced analytics',
      'Premium charts',
      'Priority support',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '₹4999',
    period: 'month',
    description: 'For institutions',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'White-label solution',
      'Dedicated support',
      'Advanced risk management',
      'Custom integrations'
    ],
    popular: false
  }
];

export function PricingSection() {
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
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI trading features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass rounded-xl p-8 relative ${
                plan.popular ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-emerald-400 mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}