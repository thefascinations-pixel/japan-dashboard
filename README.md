# Japan Life Dashboard

A luxury dark-themed expat dashboard for living in Tokyo. Built with Next.js 14.

## Features

- **Live Tokyo Weather** - Current conditions + 4-day forecast via Open-Meteo
- **Currency Converter** - Real-time JPY to USD, EUR, IDR, GBP, AUD, KRW
- **Tokyo Clock** - Live Tokyo time + date
- **Emergency Numbers** - Police, ambulance, English helplines
- **Public Holidays** - Upcoming Japanese holidays
- **Expat Links** - Curated links: immigration, transit, daily life, community

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd japan-dashboard
npm install
```

### 2. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the project.
3. Deploy.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Weather**: Open-Meteo API
- **Currency**: Exchange rate API via `/api/currency`
- **Fonts**: Shippori Mincho + DM Sans
- **Styling**: CSS Modules

## Structure

```text
app/
  page.tsx
  layout.tsx
  globals.css
  api/
    chat/route.ts
    weather/route.ts
    currency/route.ts
components/
  WeatherWidget.tsx
  CurrencyWidget.tsx
  InfoWidgets.tsx
  QuickFacts.tsx
```
