'use client';

import { useStore } from '@/stores/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function PriceAlerts() {
  const { stocks, priceAlerts, addPriceAlert, removePriceAlert } = useStore();
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [condition, setCondition] = useState<'ABOVE' | 'BELOW'>('ABOVE');
  const [targetPrice, setTargetPrice] = useState('');

  const handleAddAlert = () => {
    if (!selectedSymbol || !targetPrice) return;

    const price = parseFloat(targetPrice);
    if (isNaN(price)) return;

    addPriceAlert({
      symbol: selectedSymbol,
      condition,
      targetPrice: price,
      isActive: true,
    });

    // Reset form
    setSelectedSymbol('');
    setTargetPrice('');
  };

  const getCurrentPrice = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock?.price || 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="w-5 h-5" />
          Price Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Alert Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger>
              <SelectValue placeholder="Select stock" />
            </SelectTrigger>
            <SelectContent>
              {stocks.map((stock) => (
                <SelectItem key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - ${stock.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={condition} onValueChange={(value: 'ABOVE' | 'BELOW') => setCondition(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ABOVE">Above</SelectItem>
              <SelectItem value="BELOW">Below</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Target price"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            step="0.01"
          />

          <Button onClick={handleAddAlert} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Alert
          </Button>
        </div>

        {/* Active Alerts */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Alerts</h4>
          {priceAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No price alerts set</p>
          ) : (
            <div className="space-y-2">
              {priceAlerts.map((alert) => {
                const currentPrice = getCurrentPrice(alert.symbol);
                const isTriggered = alert.condition === 'ABOVE'
                  ? currentPrice >= alert.targetPrice
                  : currentPrice <= alert.targetPrice;

                return (
                  <div
                    key={alert.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      isTriggered ? 'bg-orange-50 border-orange-200 dark:bg-orange-950/20' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.condition === 'ABOVE' ? 'default' : 'secondary'}>
                        {alert.symbol}
                      </Badge>
                      <span className="text-sm">
                        {alert.condition === 'ABOVE' ? '>' : '<'} ${alert.targetPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Current: ${currentPrice.toFixed(2)}
                      </span>
                      {isTriggered && (
                        <Badge variant="destructive" className="animate-pulse">
                          TRIGGERED
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePriceAlert(alert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}