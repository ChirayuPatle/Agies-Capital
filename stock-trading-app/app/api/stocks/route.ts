import { NextRequest, NextResponse } from 'next/server';
import { mockStocks } from '@/data/mockData';

// Simulate real-time stock price updates with more realistic volatility
function updateStockPrices(stocks: any[]) {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Market hours simulation (9:30 AM - 4:00 PM EST)
  const isMarketOpen = (hour > 9 || (hour === 9 && minute >= 30)) && hour < 16;

  return stocks.map(stock => {
    // Base volatility on stock characteristics
    const baseVolatility = stock.symbol.includes('TSLA') ? 0.03 : // High volatility
                          stock.symbol.includes('NVDA') ? 0.025 :
                          stock.symbol.includes('AAPL') ? 0.015 : 0.02;

    // Add time-based volatility (higher during market hours)
    const timeMultiplier = isMarketOpen ? 1.5 : 0.3;

    // Add random market sentiment (-1 to 1)
    const marketSentiment = (Math.random() - 0.5) * 2;

    // Calculate price change
    const volatility = baseVolatility * timeMultiplier;
    const priceChange = stock.price * volatility * marketSentiment * 0.01; // Max 1% change per update

    const newPrice = Math.max(0.01, stock.price + priceChange);
    const change = newPrice - stock.price;
    const changePercent = (change / stock.price) * 100;

    // Update volume (higher during market hours)
    const volumeMultiplier = isMarketOpen ? (0.8 + Math.random() * 0.4) : 0.1;
    const newVolume = Math.floor(stock.volume * volumeMultiplier);

    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: newVolume,
      lastUpdate: now.toISOString(),
      marketStatus: isMarketOpen ? 'OPEN' : 'CLOSED',
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (symbol) {
      // Get specific stock
      const stock = mockStocks.find(s => s.symbol === symbol.toUpperCase());
      if (!stock) {
        return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
      }
      return NextResponse.json(updateStockPrices([stock])[0]);
    }

    // Get all stocks
    const updatedStocks = updateStockPrices(mockStocks);
    return NextResponse.json(updatedStocks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}