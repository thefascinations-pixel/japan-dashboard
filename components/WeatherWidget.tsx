'use client'
import { useEffect, useState } from 'react'
import styles from './WeatherWidget.module.css'

const WMO: Record<number, { label: string; icon: string }> = {
  0:  { label: 'Clear', icon: '☀️' },
  1:  { label: 'Mostly clear', icon: '🌤' },
  2:  { label: 'Partly cloudy', icon: '⛅' },
  3:  { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫' },
  48: { label: 'Icy fog', icon: '🌫' },
  51: { label: 'Light drizzle', icon: '🌦' },
  53: { label: 'Drizzle', icon: '🌦' },
  55: { label: 'Heavy drizzle', icon: '🌧' },
  61: { label: 'Light rain', icon: '🌧' },
  63: { label: 'Rain', icon: '🌧' },
  65: { label: 'Heavy rain', icon: '🌧' },
  71: { label: 'Light snow', icon: '🌨' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Showers', icon: '🌦' },
  95: { label: 'Thunderstorm', icon: '⛈' },
  99: { label: 'Heavy thunder', icon: '⛈' },
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function getWMO(code: number) {
  return WMO[code] ?? { label: 'Unknown', icon: '🌡' }
}

export default function WeatherWidget() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/weather')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className={styles.card}><div className={styles.loading}>読み込み中…</div></div>
  if (!data || data.error) return <div className={styles.card}><div className={styles.loading}>Weather unavailable</div></div>

  const cur = data.current
  const daily = data.daily
  const wmo = getWMO(cur.weather_code)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>東京 / TOKYO</span>
        <span className={styles.sublabel}>Weather</span>
      </div>

      <div className={styles.current}>
        <div className={styles.icon}>{wmo.icon}</div>
        <div className={styles.tempBlock}>
          <div className={styles.temp}>{Math.round(cur.temperature_2m)}°</div>
          <div className={styles.feels}>Feels {Math.round(cur.apparent_temperature)}°</div>
        </div>
        <div className={styles.details}>
          <div className={styles.condition}>{wmo.label}</div>
          <div className={styles.meta}>
            <span>💧 {cur.relative_humidity_2m}%</span>
            <span>🌬 {Math.round(cur.wind_speed_10m)} km/h</span>
          </div>
        </div>
      </div>

      <div className={styles.forecast}>
        {daily.time.slice(1, 5).map((date: string, i: number) => {
          const d = new Date(date)
          const dWmo = getWMO(daily.weather_code[i + 1])
          return (
            <div key={date} className={styles.day}>
              <span className={styles.dayName}>{DAYS[d.getDay()]}</span>
              <span className={styles.dayIcon}>{dWmo.icon}</span>
              <span className={styles.dayMax}>{Math.round(daily.temperature_2m_max[i + 1])}°</span>
              <span className={styles.dayMin}>{Math.round(daily.temperature_2m_min[i + 1])}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
