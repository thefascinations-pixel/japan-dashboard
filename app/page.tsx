import WeatherWidget from '@/components/WeatherWidget'
import CurrencyWidget from '@/components/CurrencyWidget'
import { HolidaysWidget, LinksWidget } from '@/components/InfoWidgets'
import QuickFacts from '@/components/QuickFacts'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Background geometry */}
      <div className={styles.bgGeo} aria-hidden="true">
        <div className={styles.geo1} />
        <div className={styles.geo2} />
        <div className={styles.geo3} />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoMark}>
            <span className={styles.logoKanji}>日</span>
          </div>
          <div>
            <h1 className={styles.title}>Japan Life</h1>
            <p className={styles.subtitle}>東京 Expat Dashboard</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>🇯🇵 Tokyo</span>
        </div>
      </header>

      {/* Main grid */}
      <main className={styles.grid}>
        {/* Top row */}
        <div className={styles.col}>
          <WeatherWidget />
        </div>
        <div className={styles.col}>
          <CurrencyWidget />
        </div>
        <div className={styles.col}>
          <QuickFacts />
        </div>

        <div className={styles.col}>
          <HolidaysWidget />
        </div>
        <div className={styles.col}>
          <LinksWidget />
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Japan Life Dashboard</span>
        <span className={styles.footerJp}>日本生活</span>
      </footer>
    </div>
  )
}
