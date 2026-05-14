'use client';

import { useStore } from '@/stores/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, WifiOff } from 'lucide-react';

export function LiveModeToggle() {
  const { isLiveMode, lastUpdate, toggleLiveMode, liveUpdateInterval } = useStore();

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
      <Button
        onClick={toggleLiveMode}
        variant={isLiveMode ? "default" : "outline"}
        size="sm"
        className={`flex items-center gap-2 transition-all duration-300 ${
          isLiveMode ? 'bg-green-600 hover:bg-green-700 animate-pulse' : ''
        }`}
      >
        {isLiveMode ? (
          <>
            <Activity className="w-4 h-4" />
            Live Mode
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            Live Mode
          </>
        )}
      </Button>

      <div className="flex items-center gap-2">
        <Badge variant={isLiveMode ? "default" : "secondary"} className="text-xs">
          {isLiveMode ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
          ) : (
            'Offline'
          )}
        </Badge>

        {lastUpdate && (
          <span className="text-xs text-muted-foreground">
            Updated {formatLastUpdate(lastUpdate)}
          </span>
        )}
      </div>

      {isLiveMode && (
        <div className="text-xs text-muted-foreground">
          Refresh: {liveUpdateInterval / 1000}s
        </div>
      )}
    </div>
  );
}