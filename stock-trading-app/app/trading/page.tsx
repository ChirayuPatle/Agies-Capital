'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/stores/useStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency } from '@/utils/formatters';
import { Order } from '@/types';

export default function TradingPage() {
  const { isAuthenticated, stocks, selectedStock, setSelectedStock, placeOrder, orders, isLoading } = useStore();
  const router = useRouter();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleSymbolChange = (value: string) => {
    setSymbol(value);
    const stock = stocks.find(s => s.symbol === value);
    if (stock) {
      setSelectedStock(stock);
      setPrice(stock.price.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const qty = parseInt(quantity);
    const prc = orderType === 'LIMIT' ? parseFloat(price) : undefined;

    if (!symbol || !qty || qty <= 0) {
      setMessage('Please enter valid symbol and quantity');
      return;
    }

    if (orderType === 'LIMIT' && (!prc || prc <= 0)) {
      setMessage('Please enter valid price for limit order');
      return;
    }

    const success = await placeOrder({
      symbol,
      type: orderType,
      side,
      quantity: qty,
      price: prc,
      timestamp: new Date(),
    });

    if (success) {
      setMessage('Order placed successfully!');
      setQuantity('');
      setPrice('');
    } else {
      setMessage('Failed to place order. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Trading</h1>
              <p className="text-gray-400">Place buy and sell orders for stocks</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Place Order</CardTitle>
                  <CardDescription>Enter your trading details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Stock Symbol
                      </label>
                      <Select value={symbol} onValueChange={handleSymbolChange}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select a stock" />
                        </SelectTrigger>
                        <SelectContent>
                          {stocks.map((stock) => (
                            <SelectItem key={stock.symbol} value={stock.symbol}>
                              {stock.symbol} - {stock.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Order Type
                        </label>
                        <Select value={orderType} onValueChange={(value: 'MARKET' | 'LIMIT') => setOrderType(value)}>
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MARKET">Market</SelectItem>
                            <SelectItem value="LIMIT">Limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Side
                        </label>
                        <Select value={side} onValueChange={(value: 'BUY' | 'SELL') => setSide(value)}>
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BUY">Buy</SelectItem>
                            <SelectItem value="SELL">Sell</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min="1"
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Enter quantity"
                      />
                    </div>

                    {orderType === 'LIMIT' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Price
                        </label>
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          min="0.01"
                          step="0.01"
                          className="bg-slate-800 border-slate-700 text-white"
                          placeholder="Enter price"
                        />
                      </div>
                    )}

                    {selectedStock && quantity && (
                      <div className="p-4 bg-slate-800 rounded-lg">
                        <p className="text-sm text-gray-300">Order Summary</p>
                        <p className="text-white">
                          {side} {quantity} shares of {selectedStock.symbol} at{' '}
                          {orderType === 'MARKET' ? 'market price' : formatCurrency(parseFloat(price))}
                        </p>
                        <p className="text-sm text-gray-400">
                          Estimated total: {formatCurrency(
                            (orderType === 'MARKET' ? selectedStock.price : parseFloat(price)) * parseInt(quantity)
                          )}
                        </p>
                      </div>
                    )}

                    {message && (
                      <Alert variant={message.includes('success') ? 'default' : 'destructive'}>
                        <AlertDescription>{message}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order: Order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">
                            {order.side} {order.symbol}
                          </p>
                          <p className="text-sm text-gray-400">
                            {order.quantity} shares • {order.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{formatCurrency(order.price || 0)}</p>
                          <p className={`text-sm ${
                            order.status === 'EXECUTED' ? 'text-green-400' :
                            order.status === 'PENDING' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <p className="text-gray-400 text-center py-4">No orders yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}