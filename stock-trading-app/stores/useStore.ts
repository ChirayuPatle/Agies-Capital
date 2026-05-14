import { create } from 'zustand';
import { Stock, Portfolio, Transaction, WatchlistItem, User, Order, Notification, PriceAlert } from '@/types';
import { mockPortfolio, mockTransactions, mockWatchlist } from '@/data/mockData';

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;

  // Portfolio
  portfolio: Portfolio;
  transactions: Transaction[];
  orders: Order[];

  // Watchlist
  watchlist: WatchlistItem[];

  // Stocks
  stocks: Stock[];
  selectedStock: Stock | null;

  // UI State
  isDarkMode: boolean;
  sidebarOpen: boolean;
  isLoading: boolean;

  // Dynamic Features
  isLiveMode: boolean;
  liveUpdateInterval: number;
  lastUpdate: Date | null;
  notifications: Notification[];
  priceAlerts: PriceAlert[];

  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  addTransaction: (transaction: Transaction) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  toggleWatchlist: (symbol: string) => void;
  setStocks: (stocks: Stock[]) => void;
  setSelectedStock: (stock: Stock | null) => void;
  setDarkMode: (dark: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'status'>) => Promise<boolean>;
  fetchStocks: () => Promise<void>;
  fetchPortfolio: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  searchStocks: (query: string) => Promise<Stock[]>;

  // Dynamic Actions
  toggleLiveMode: () => void;
  setLiveUpdateInterval: (interval: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removePriceAlert: (id: string) => void;
  checkPriceAlerts: () => void;
  startLiveUpdates: () => void;
  stopLiveUpdates: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,

  portfolio: mockPortfolio,
  transactions: mockTransactions,
  orders: [],
  watchlist: mockWatchlist,
  stocks: [],
  selectedStock: null,

  isDarkMode: true,
  sidebarOpen: true,
  isLoading: false,

  // Dynamic Features
  isLiveMode: false,
  liveUpdateInterval: 2000, // 2 seconds
  lastUpdate: null,
  notifications: [],
  priceAlerts: [],

  // Actions
  setUser: (user) => set({ user }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),

  updatePortfolio: (portfolio) => set({ portfolio }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order]
    })),

  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === id ? { ...order, ...updates } : order
      )
    })),

  toggleWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.map(item =>
        item.symbol === symbol
          ? { ...item, isInWatchlist: !item.isInWatchlist }
          : item
      )
    })),

  setStocks: (stocks) => set({ stocks }),
  setSelectedStock: (stock) => set({ selectedStock: stock }),

  setDarkMode: (dark) => set({ isDarkMode: dark }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  placeOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        const order = await response.json();
        get().addOrder(order);

        // Add notification for order placement
        get().addNotification({
          type: 'ORDER_EXECUTED',
          title: 'Order Placed',
          message: `${order.side} ${order.quantity} shares of ${order.symbol} at ${order.type === 'MARKET' ? 'market price' : `$${order.price}`}`,
          data: order,
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Place order error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStocks: async () => {
    try {
      const response = await fetch('/api/stocks');
      if (response.ok) {
        const stocks = await response.json();
        set({ stocks, lastUpdate: new Date() });

        // Initialize watchlist with all stocks if not already done
        const currentWatchlist = get().watchlist;
        if (currentWatchlist.length === 0) {
          const initialWatchlist = stocks.map((stock: Stock) => ({
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            change: stock.change,
            changePercent: stock.changePercent,
            isInWatchlist: ['AAPL', 'TSLA', 'NVDA'].includes(stock.symbol), // Default watchlist
          }));
          set({ watchlist: initialWatchlist });
        } else {
          // Update prices in existing watchlist
          const updatedWatchlist = currentWatchlist.map(item => {
            const stock = stocks.find((s: Stock) => s.symbol === item.symbol);
            return stock ? { ...item, price: stock.price, change: stock.change, changePercent: stock.changePercent } : item;
          });
          set({ watchlist: updatedWatchlist });
        }

        // Check price alerts
        get().checkPriceAlerts();
      }
    } catch (error) {
      console.error('Fetch stocks error:', error);
    }
  },

  fetchPortfolio: async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const portfolio = await response.json();
        set({ portfolio });
      }
    } catch (error) {
      console.error('Fetch portfolio error:', error);
    }
  },

  fetchOrders: async () => {
    try {
      const response = await fetch('/api/trade');
      if (response.ok) {
        const orders = await response.json();
        // Update existing orders with new status
        set({ orders });
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    }
  },

  fetchTransactions: async () => {
    try {
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const transactions = await response.json();
        // Convert timestamp strings back to Date objects
        const processedTransactions = transactions.map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }));
        set({ transactions: processedTransactions });
      }
    } catch (error) {
      console.error('Fetch transactions error:', error);
    }
  },

  searchStocks: async (query: string) => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Search stocks error:', error);
      return [];
    }
  },

  // Dynamic Actions
  toggleLiveMode: () => {
    const { isLiveMode } = get();
    set({ isLiveMode: !isLiveMode });

    if (!isLiveMode) {
      // Start live updates
      get().startLiveUpdates();
    } else {
      // Stop live updates
      get().stopLiveUpdates();
    }
  },

  setLiveUpdateInterval: (interval) => set({ liveUpdateInterval: interval }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [{
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      }, ...state.notifications]
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true }))
    })),

  addPriceAlert: (alert) =>
    set((state) => ({
      priceAlerts: [...state.priceAlerts, {
        ...alert,
        id: Date.now().toString(),
        createdAt: new Date(),
      }]
    })),

  removePriceAlert: (id) =>
    set((state) => ({
      priceAlerts: state.priceAlerts.filter(a => a.id !== id)
    })),

  checkPriceAlerts: () => {
    const { stocks, priceAlerts, addNotification } = get();
    const updatedAlerts = priceAlerts.map(alert => {
      if (!alert.isActive) return alert;
      const stock = stocks.find(s => s.symbol === alert.symbol);
      if (!stock) return alert;

      const triggered = alert.condition === 'ABOVE'
        ? stock.price >= alert.targetPrice
        : stock.price <= alert.targetPrice;

      if (triggered) {
        addNotification({
          type: 'PRICE_ALERT',
          title: `Price Alert: ${alert.symbol}`,
          message: `${alert.symbol} has ${alert.condition.toLowerCase()} $${alert.targetPrice} (${stock.price.toFixed(2)})`,
          data: { symbol: alert.symbol, price: stock.price, targetPrice: alert.targetPrice }
        });
        return { ...alert, isActive: false };
      }

      return alert;
    });

    set({ priceAlerts: updatedAlerts });
  },

  // Helper methods for live updates
  startLiveUpdates: () => {
    const { liveUpdateInterval } = get();
    const intervalId = setInterval(async () => {
      await get().fetchStocks();
      get().checkPriceAlerts();
      set({ lastUpdate: new Date() });
    }, liveUpdateInterval);

    // Store interval ID for cleanup
    (get() as any).liveIntervalId = intervalId;
  },

  stopLiveUpdates: () => {
    const state = get() as any;
    if (state.liveIntervalId) {
      clearInterval(state.liveIntervalId);
      delete state.liveIntervalId;
    }
  },
}));