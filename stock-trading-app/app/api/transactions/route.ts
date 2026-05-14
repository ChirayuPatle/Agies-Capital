import { NextResponse } from 'next/server';
import { mockTransactions } from '@/data/mockData';
import { transactions as tradeTransactions } from '../trade/route';

export async function GET() {
  try {
    return NextResponse.json([...mockTransactions, ...tradeTransactions]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}