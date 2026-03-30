'use client'
import styles from './InfoWidgets.module.css'

const HOLIDAYS_2025 = [
  { date: 'Apr 29', name: 'Showa Day', jp: '昭和の日' },
  { date: 'May 3',  name: 'Constitution Day', jp: '憲法記念日' },
  { date: 'May 4',  name: 'Greenery Day', jp: 'みどりの日' },
  { date: 'May 5',  name: "Children's Day", jp: 'こどもの日' },
  { date: 'Jul 21', name: 'Marine Day', jp: '海の日' },
  { date: 'Aug 11', name: 'Mountain Day', jp: '山の日' },
  { date: 'Sep 15', name: 'Respect for the Aged', jp: '敬老の日' },
  { date: 'Sep 23', name: 'Autumnal Equinox', jp: '秋分の日' },
  { date: 'Oct 13', name: 'Sports Day', jp: 'スポーツの日' },
  { date: 'Nov 3',  name: 'Culture Day', jp: '文化の日' },
  { date: 'Nov 23', name: 'Labour Thanksgiving', jp: '勤労感謝の日' },
  { date: 'Dec 23', name: 'Emperor Birthday', jp: '天皇誕生日' },
]

const LINKS = [
  { category: 'Official', items: [
    { label: 'My Number (マイナンバー)', url: 'https://www.kojinbango-card.go.jp/en/', icon: '🪪' },
    { label: 'Immigration Services Agency', url: 'https://www.isa.go.jp/en/', icon: '🛂' },
    { label: 'National Tax Agency', url: 'https://www.nta.go.jp/english/', icon: '📋' },
    { label: 'Tokyo Metropolitan Govt', url: 'https://www.metro.tokyo.lg.jp/english/', icon: '🗼' },
  ]},
  { category: 'Daily Life', items: [
    { label: 'HyperDia (Transit)', url: 'https://www.hyperdia.com/', icon: '🚆' },
    { label: 'Suica / PASMO (IC card)', url: 'https://www.pasmo.co.jp/en/', icon: '💳' },
    { label: 'NHK World (News EN)', url: 'https://www3.nhk.or.jp/nhkworld/', icon: '📡' },
    { label: 'Japan Postal Service', url: 'https://www.post.japanpost.jp/int/index_en.html', icon: '✉️' },
  ]},
  { category: 'Expat Resources', items: [
    { label: 'Gaijin Pot (Jobs/Info)', url: 'https://gaijinpot.com', icon: '🌏' },
    { label: 'Japan Helpline (24h EN)', url: 'https://jhelp.com/', icon: '📞' },
    { label: 'Tokyo Cheapo', url: 'https://tokyocheapo.com/', icon: '🤑' },
    { label: 'TimeOut Tokyo', url: 'https://www.timeout.com/tokyo', icon: '🎭' },
  ]},
]

function getUpcomingHolidays() {
  const now = new Date()
  const year = now.getFullYear()
  return HOLIDAYS_2025
    .map(h => ({ ...h, fullDate: new Date(`${h.date} ${year}`) }))
    .filter(h => h.fullDate >= now)
    .slice(0, 4)
}

export function HolidaysWidget() {
  const upcoming = getUpcomingHolidays()
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>祝日 / HOLIDAYS</span>
        <span className={styles.sublabel}>Upcoming 2025</span>
      </div>
      <div className={styles.holidays}>
        {upcoming.map(h => (
          <div key={h.date} className={styles.holiday}>
            <div className={styles.hDate}>{h.date}</div>
            <div className={styles.hInfo}>
              <div className={styles.hName}>{h.name}</div>
              <div className={styles.hJp}>{h.jp}</div>
            </div>
          </div>
        ))}
        {upcoming.length === 0 && (
          <div className={styles.noHolidays}>No upcoming holidays this year</div>
        )}
      </div>
    </div>
  )
}

export function LinksWidget() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>便利リンク / USEFUL LINKS</span>
      </div>
      <div className={styles.linkSections}>
        {LINKS.map(section => (
          <div key={section.category} className={styles.section}>
            <div className={styles.sectionTitle}>{section.category}</div>
            <div className={styles.linkGrid}>
              {section.items.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <span className={styles.linkIcon}>{link.icon}</span>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkArrow}>→</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
