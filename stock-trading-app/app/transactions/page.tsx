'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/stores/useStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { Transaction } from '@/types';

export default function TransactionsPage() {
  const { isAuthenticated, transactions, fetchTransactions } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      fetchTransactions();
    }
  }, [isAuthenticated, router, fetchTransactions]);

  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'FAILED':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeColor = (type: Transaction['type']) => {
    return type === 'BUY' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400';
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
              <p className="text-gray-400">View all your trading transactions</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All your buy and sell transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction: Transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-white font-semibold">{transaction.symbol}</div>
                          <div className="text-sm text-gray-400">
                            {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {transaction.type} {transaction.quantity} shares
                          </div>
                          <div className="text-sm text-gray-400">
                            @ {formatCurrency(transaction.price || 0)}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {formatCurrency(transaction.total)}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Badge className={getTypeColor(transaction.type)}>
                            {transaction.type}
                          </Badge>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {transactions.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No transactions yet</p>
                      <p className="text-sm text-gray-500">Your trading activity will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}