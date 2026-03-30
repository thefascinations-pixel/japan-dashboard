import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/JPY', {
      next: { revalidate: 3600 },
    })
    const data = await res.json()
    return NextResponse.json({
      rates: {
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        IDR: data.rates.IDR,
        GBP: data.rates.GBP,
        AUD: data.rates.AUD,
        KRW: data.rates.KRW,
      },
      updated: data.time_last_update_utc,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 })
  }
}
