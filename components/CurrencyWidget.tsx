'use client'
import { useEffect, useState } from 'react'
import styles from './CurrencyWidget.module.css'

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'IDR', flag: '🇮🇩', name: 'Indonesian Rupiah' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar' },
  { code: 'KRW', flag: '🇰🇷', name: 'Korean Won' },
]

export default function CurrencyWidget() {
  const [rates, setRates] = useState<Record<string, number>>({})
  const [amount, setAmount] = useState('10000')
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState('')

  useEffect(() => {
    fetch('/api/currency')
      .then(r => r.json())
      .then(d => {
        setRates(d.rates || {})
        setUpdated(d.updated ? new Date(d.updated).toLocaleDateString('en-JP', { month: 'short', day: 'numeric' }) : '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const jpy = parseInt(amount.replace(/,/g, '')) || 0

  const formatAmount = (val: number, code: string) => {
    if (code === 'IDR' || code === 'KRW') return val.toLocaleString('en', { maximumFractionDigits: 0 })
    return val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>為替 / CURRENCY</span>
        {updated && <span className={styles.sublabel}>Updated {updated}</span>}
      </div>

      <div className={styles.inputRow}>
        <span className={styles.jpyFlag}>🇯🇵</span>
        <span className={styles.jpyCode}>JPY ¥</span>
        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="10000"
        />
      </div>

      {loading ? (
        <div className={styles.loading}>読み込み中…</div>
      ) : (
        <div className={styles.grid}>
          {CURRENCIES.map(({ code, flag, name }) => {
            const converted = jpy * (rates[code] || 0)
            return (
              <div key={code} className={styles.row}>
                <span className={styles.flag}>{flag}</span>
                <div className={styles.cInfo}>
                  <span className={styles.code}>{code}</span>
                  <span className={styles.name}>{name}</span>
                </div>
                <span className={styles.value}>
                  {rates[code] ? formatAmount(converted, code) : '—'}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
