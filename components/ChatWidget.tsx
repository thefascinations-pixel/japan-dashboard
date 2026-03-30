'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'How do I get a residence card?',
  'Best IC card for Tokyo transit?',
  'How does NHI health insurance work?',
  'Recommend ramen spots in Shibuya',
  'How to open a Japanese bank account?',
  'What is hanami season?',
]

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^• /gm, '<span class="bullet">•</span> ')
    .replace(/^- /gm, '<span class="bullet">•</span> ')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.text }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.hanaInfo}>
          <div className={styles.avatar}>
            <span>は</span>
            <div className={styles.dot} />
          </div>
          <div>
            <div className={styles.hanaName}>Hana <span className={styles.kana}>はな</span></div>
            <div className={styles.hanaRole}>AI Japan Guide</div>
          </div>
        </div>
        <span className={styles.sublabel}>Ask anything</span>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>こんにちは！ I'm Hana.</div>
            <div className={styles.emptyText}>Your AI guide to life in Japan. Ask me about visas, transit, food, culture, language — anything.</div>
            <div className={styles.suggestions}>
              {SUGGESTIONS.map(s => (
                <button key={s} className={styles.suggestion} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`${styles.message} ${styles[m.role]}`}>
            {m.role === 'assistant' && <div className={styles.msgAvatar}>は</div>}
            <div
              className={styles.bubble}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
            />
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.msgAvatar}>は</div>
            <div className={styles.bubble}>
              <div className={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Hana anything about Japan…"
          rows={1}
        />
        <button className={styles.sendBtn} onClick={() => send()} disabled={!input.trim() || loading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
