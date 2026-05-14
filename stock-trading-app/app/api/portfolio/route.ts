import { NextRequest, NextResponse } from 'next/server';
import { mockPortfolio } from '@/data/mockData';

// Simulate portfolio updates
function updatePortfolio(portfolio: any) {
  // Update holdings with new prices
  const updatedHoldings = portfolio.holdings.map((holding: any) => {
    const priceChange = (Math.random() - 0.5) * 10;
    const newPrice = holding.currentPrice + priceChange;
    const newValue = newPrice * holding.quantity;
    const pnl = newValue - (holding.avgPrice * holding.quantity);
    const pnlPercent = (pnl / (holding.avgPrice * holding.quantity)) * 100;

    return {
      ...holding,
      currentPrice: newPrice,
      totalValue: newValue,
      pnl,
      pnlPercent,
    };
  });

  const totalValue = updatedHoldings.reduce((sum: number, h: any) => sum + h.totalValue, 0);
  const investedAmount = portfolio.investedAmount;
  const returns = totalValue - investedAmount;
  const returnsPercent = (returns / investedAmount) * 100;

  return {
    ...portfolio,
    totalBalance: portfolio.totalBalance + returns - portfolio.returns,
    returns,
    returnsPercent,
    holdings: updatedHoldings,
  };
}

export async function GET() {
  try {
    const updatedPortfolio = updatePortfolio(mockPortfolio);
    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}