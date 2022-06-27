import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@c/Layout'
import { useTranslation } from 'react-i18next'
import useChatService from '@/hooks/useChatService'
import { strictEnter } from '@/utils/event'

export default function Room () {
  const router = useRouter()
  const { t, i18n } = useTranslation('room')
  i18n.addResourceBundle('ja', 'room', {
    go: '確定',
    name: '名前',
    exit: '退室'
  })

  const name = localStorage.getItem('name') || ''
  if (!name) {
    router.replace('/')
    return null
  }

  const { messages, sendMessage, connect } = useChatService()

  useEffect(() => {
    const query = { name }
    const params = new URLSearchParams(query).toString()
    const unmount = connect(params, () => {
      router.replace('/')
    })
    return unmount
  }, [])

  const [input, setInput] = useState('')
  const send = () => {
    sendMessage({ name, body: input })
    setInput('')
  }
  return (
    <Layout title="Top">
      <main>
        <h1 className="title">{t('title', { ns: 'common' })}</h1>
        <p className="description">{t('description', { ns: 'common' })}</p>
        <p>
          {t('name')}: {name}
        </p>
        {messages.map((message, index) => (
          <p style={{ margin: 0 }} key={index}>
            {message.name}: {message.body}
          </p>
        ))}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => strictEnter(e, send)}
          value={input}
        />
        <button onClick={send}>{t('go')}</button>
        <button onClick={() => router.replace('/')}>{t('exit')}</button>
      </main>
    </Layout>
  )
}
