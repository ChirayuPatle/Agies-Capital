# Agies Capital - AI-Powered Stock Trading Platform

A modern, responsive stock trading platform built with Next.js, featuring AI-powered insights, real-time analytics, and a premium fintech UI inspired by TradingView and Zerodha.

## 🚀 Features

### Landing Page

- Animated stock charts with glassmorphism effects
- Live market indices display (NIFTY 50, SENSEX, NASDAQ, BTC, ETH)
- Feature showcase with AI insights, portfolio analytics, and paper trading
- Testimonials and pricing sections
- Modern footer with social links

### Dashboard

- Portfolio overview with key metrics (Total Balance, Daily P&L, Returns %)
- Interactive candlestick charts
- AI recommendation widget with buy/sell/hold signals
- Watchlist with live stock prices
- Recent transactions table
- Market news feed with sentiment analysis

### Authentication (Planned)

- Beautiful login/signup pages
- OTP verification flow
- Social login integration
- Forgot password functionality

### AI Features (Planned)

- AI chatbot for stock analysis
- Natural language search ("Show top EV stocks")
- Predictive analytics dashboard
- Risk analysis meter
- Smart portfolio suggestions

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Charts**: Custom SVG charts (ApexCharts/Recharts ready)
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism effects
- **Colors**: Black, deep blue, purple, and emerald accents
- **Typography**: Modern, professional fonts
- **Components**: Reusable UI components with smooth animations
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
stock-trading-app/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── landing/          # Landing page components
│   └── dashboard/        # Dashboard components
├── stores/               # Zustand state management
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── data/                 # Mock data
└── public/               # Static assets
```

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Components

### Landing Page Components

- `HeroSection`: Animated hero with stock charts and CTA
- `FeaturesSection`: Feature showcase with icons
- `TestimonialsSection`: Customer testimonials
- `PricingSection`: Subscription plans
- `Footer`: Site footer with links

### Dashboard Components

- `Sidebar`: Navigation sidebar with icons
- `PortfolioCards`: Key portfolio metrics
- `StockChart`: Interactive price charts
- `AIRecommendations`: AI trading signals
- `Watchlist`: Stock watchlist
- `NewsFeed`: Market news with sentiment

### UI Components (shadcn/ui)

- Button, Card, Dialog, Select, Toast, etc.

## 📊 Mock Data

The application uses realistic mock data for:

- Stock prices and market data
- Portfolio holdings and performance
- AI recommendations with confidence scores
- Market news with sentiment analysis
- User transactions and watchlist

## 🔮 Future Enhancements

- [ ] Trading terminal with order placement
- [ ] Real-time WebSocket data streaming
- [ ] AI chatbot integration
- [ ] Voice command support
- [ ] Paper trading simulator
- [ ] Portfolio heatmap visualization
- [ ] Advanced technical indicators
- [ ] Multi-asset support (crypto, commodities)
- [ ] Social trading features

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please open an issue on GitHub.
