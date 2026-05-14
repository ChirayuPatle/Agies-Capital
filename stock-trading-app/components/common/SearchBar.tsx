'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';
import { Stock } from '@/types';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchStocks, setSelectedStock, toggleWatchlist, watchlist } = useStore();

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      const searchResults = await searchStocks(query);
      setResults(searchResults);
      setIsSearching(false);
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [query, searchStocks]);

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setQuery('');
    setResults([]);
  };

  const isInWatchlist = (symbol: string) => {
    return watchlist.some(item => item.symbol === symbol && item.isInWatchlist);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-b-0"
              onClick={() => handleSelectStock(stock)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{formatCurrency(stock.price)}</div>
                    <div className={`text-sm ${getChangeColor(stock.change)}`}>
                      {formatPercentage(stock.changePercent)}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 text-yellow-400 hover:text-yellow-300"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(stock.symbol);
                }}
              >
                {isInWatchlist(stock.symbol) ? '★' : '☆'}
              </Button>
            </div>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 text-center">
          <div className="text-gray-400">Searching...</div>
        </div>
      )}
    </div>
  );
}