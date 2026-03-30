import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Open-Meteo - free, no API key needed
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=Asia%2FTokyo&forecast_days=5',
      { next: { revalidate: 1800 } }
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 })
  }
}
