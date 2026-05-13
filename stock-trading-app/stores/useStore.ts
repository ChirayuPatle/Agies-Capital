import { create } from 'zustand';
import { Stock, Portfolio, Transaction, WatchlistItem, User } from '@/types';
import { mockPortfolio, mockTransactions, mockWatchlist } from '@/data/mockData';

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;

  // Portfolio
  portfolio: Portfolio;
  transactions: Transaction[];

  // Watchlist
  watchlist: WatchlistItem[];

  // UI State
  isDarkMode: boolean;
  sidebarOpen: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  addTransaction: (transaction: Transaction) => void;
  toggleWatchlist: (symbol: string) => void;
  setDarkMode: (dark: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    isVerified: true
  },
  isAuthenticated: true,

  portfolio: mockPortfolio,
  transactions: mockTransactions,
  watchlist: mockWatchlist,

  isDarkMode: true,
  sidebarOpen: true,

  // Actions
  setUser: (user) => set({ user }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),

  updatePortfolio: (portfolio) => set({ portfolio }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),

  toggleWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.map(item =>
        item.symbol === symbol
          ? { ...item, isInWatchlist: !item.isInWatchlist }
          : item
      )
    })),

  setDarkMode: (dark) => set({ isDarkMode: dark }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));