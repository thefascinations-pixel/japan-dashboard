'use client'
import { useEffect, useState } from 'react'
import styles from './QuickFacts.module.css'

function tokyoTime() {
  return new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function tokyoDate() {
  return new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Tokyo',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const EMERGENCY = [
  { label: 'Police', num: '110', color: '#5b8dee' },
  { label: 'Fire / Ambulance', num: '119', color: '#e05555' },
  { label: 'EN Help', num: '03-3501-0110', color: '#4ecdc4' },
  { label: 'JNTO', num: '050-3816-2787', color: '#c8a96e' },
]

export default function QuickFacts() {
  const [time, setTime] = useState(tokyoTime())
  const [date, setDate] = useState(tokyoDate())

  useEffect(() => {
    const t = setInterval(() => {
      setTime(tokyoTime())
      setDate(tokyoDate())
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={styles.wrapper}>
      {/* Clock */}
      <div className={styles.clockCard}>
        <span className={styles.clockLabel}>東京時間</span>
        <div className={styles.clock}>{time}</div>
        <div className={styles.clockDate}>{date}</div>
      </div>

      {/* Emergency */}
      <div className={styles.emergencyCard}>
        <div className={styles.header}>
          <span className={styles.label}>緊急 / EMERGENCY</span>
        </div>
        <div className={styles.emergencyGrid}>
          {EMERGENCY.map(e => (
            <a key={e.label} href={`tel:${e.num}`} className={styles.eItem}>
              <span className={styles.eNum} style={{ color: e.color }}>{e.num}</span>
              <span className={styles.eLabel}>{e.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
