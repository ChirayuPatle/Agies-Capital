import { Stock, Portfolio, Transaction, MarketIndex, AIRecommendation, NewsItem, WatchlistItem, ChartData, Holding } from '@/types';

export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 52847392,
    marketCap: 2750000000000,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 23456789,
    marketCap: 1780000000000,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    volume: 34567890,
    marketCap: 2820000000000,
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.42,
    change: -8.31,
    changePercent: -3.24,
    volume: 67890123,
    marketCap: 790000000000,
    sector: 'Automotive'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: 15.42,
    changePercent: 1.79,
    volume: 45678901,
    marketCap: 2150000000000,
    sector: 'Technology'
  }
];

export const mockMarketIndices: MarketIndex[] = [
  {
    name: 'NIFTY 50',
    value: 22134.75,
    change: 156.25,
    changePercent: 0.71
  },
  {
    name: 'SENSEX',
    value: 72658.42,
    change: -234.18,
    changePercent: -0.32
  },
  {
    name: 'NASDAQ',
    value: 15678.90,
    change: 89.45,
    changePercent: 0.57
  },
  {
    name: 'BTC',
    value: 65432.10,
    change: 1234.56,
    changePercent: 1.92
  },
  {
    name: 'ETH',
    value: 3456.78,
    change: -67.89,
    changePercent: -1.93
  }
];

export const mockPortfolio: Portfolio = {
  totalBalance: 125000.50,
  investedAmount: 100000.00,
  returns: 25000.50,
  returnsPercent: 25.00,
  dailyPnL: 1250.75,
  holdings: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      avgPrice: 150.00,
      currentPrice: 175.43,
      totalValue: 8771.50,
      pnl: 1271.50,
      pnlPercent: 25.43
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 30,
      avgPrice: 130.00,
      currentPrice: 142.56,
      totalValue: 4276.80,
      pnl: 381.80,
      pnlPercent: 9.80
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 20,
      avgPrice: 350.00,
      currentPrice: 378.85,
      totalValue: 7577.00,
      pnl: 577.00,
      pnlPercent: 8.24
    }
  ]
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 10,
    price: 172.50,
    total: 1725.00,
    timestamp: new Date('2024-05-10T10:30:00'),
    status: 'COMPLETED'
  },
  {
    id: '2',
    symbol: 'GOOGL',
    type: 'SELL',
    quantity: 5,
    price: 145.00,
    total: 725.00,
    timestamp: new Date('2024-05-09T14:15:00'),
    status: 'COMPLETED'
  },
  {
    id: '3',
    symbol: 'TSLA',
    type: 'BUY',
    quantity: 25,
    price: 250.00,
    total: 6250.00,
    timestamp: new Date('2024-05-08T09:45:00'),
    status: 'COMPLETED'
  }
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    symbol: 'NVDA',
    action: 'BUY',
    confidence: 0.85,
    reasoning: 'Strong Q2 earnings expected with AI chip demand surge',
    targetPrice: 950.00
  },
  {
    symbol: 'TSLA',
    action: 'HOLD',
    confidence: 0.72,
    reasoning: 'Mixed signals from EV market and autonomous driving progress',
    targetPrice: 280.00
  },
  {
    symbol: 'AAPL',
    action: 'BUY',
    confidence: 0.78,
    reasoning: 'iPhone 16 launch and services growth driving momentum',
    targetPrice: 200.00
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cuts in Q3',
    summary: 'Federal Reserve officials hint at possible interest rate reductions as inflation cools.',
    source: 'Bloomberg',
    timestamp: new Date('2024-05-14T08:00:00'),
    sentiment: 'positive'
  },
  {
    id: '2',
    title: 'Tech Stocks Rally on AI Optimism',
    summary: 'Major tech companies see gains as AI investments show promising results.',
    source: 'Reuters',
    timestamp: new Date('2024-05-14T07:30:00'),
    sentiment: 'positive'
  },
  {
    id: '3',
    title: 'Oil Prices Surge on Supply Concerns',
    summary: 'Crude oil futures climb as geopolitical tensions affect global supply.',
    source: 'CNBC',
    timestamp: new Date('2024-05-13T16:45:00'),
    sentiment: 'negative'
  }
];

export const mockWatchlist: WatchlistItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    isInWatchlist: true
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.42,
    change: -8.31,
    changePercent: -3.24,
    isInWatchlist: true
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: 15.42,
    changePercent: 1.79,
    isInWatchlist: true
  }
];

export const mockChartData: ChartData[] = [
  { time: '09:30', open: 170.00, high: 172.50, low: 169.50, close: 172.00, volume: 1000000 },
  { time: '10:00', open: 172.00, high: 173.50, low: 171.50, close: 173.00, volume: 1200000 },
  { time: '10:30', open: 173.00, high: 174.50, low: 172.50, close: 174.00, volume: 1100000 },
  { time: '11:00', open: 174.00, high: 175.50, low: 173.50, close: 175.00, volume: 1300000 },
  { time: '11:30', open: 175.00, high: 176.50, low: 174.50, close: 175.43, volume: 1150000 }
];

export const topGainers = mockStocks.filter(stock => stock.changePercent > 1).slice(0, 5);
export const topLosers = mockStocks.filter(stock => stock.changePercent < 0).slice(0, 5);