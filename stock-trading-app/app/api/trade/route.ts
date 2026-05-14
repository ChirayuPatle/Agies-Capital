import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/types';
import { mockStocks } from '@/data/mockData';

// Mock orders storage - in production, use database
let orders: Order[] = [];
let transactions: any[] = []; // Mock transactions

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validate order data
    const { symbol, type, side, quantity, price } = orderData;

    if (!symbol || !type || !side || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (type === 'LIMIT' && !price) {
      return NextResponse.json(
        { error: 'Price required for limit orders' },
        { status: 400 }
      );
    }

    // Create order
    const order: Order = {
      id: Date.now().toString(),
      symbol: symbol.toUpperCase(),
      type,
      side,
      quantity,
      price: type === 'LIMIT' ? price : undefined,
      status: 'PENDING',
      timestamp: new Date(),
    };

    orders.push(order);

    // Simulate order execution (in production, this would be handled by trading engine)
    setTimeout(() => {
      const index = orders.findIndex(o => o.id === order.id);
      if (index !== -1) {
        orders[index].status = 'EXECUTED';

        // Create transaction
        const executionPrice = order.price || 100;
    const stockPrice = order.type === 'MARKET'
      ? (mockStocks.find(s => s.symbol === order.symbol)?.price ?? executionPrice)
      : executionPrice;

    const transaction = {
      id: Date.now().toString(),
      symbol: order.symbol,
      type: order.side,
      quantity: order.quantity,
      price: stockPrice,
      total: stockPrice * order.quantity,
      timestamp: new Date(),
      status: 'COMPLETED',
    };
    transactions.push(transaction);
      }
    }, 2000); // Execute after 2 seconds

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export transactions for other APIs
export { transactions };