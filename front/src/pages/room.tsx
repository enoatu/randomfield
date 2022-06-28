import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@c/Layout'
import { useTranslation } from 'react-i18next'
import useChatService from '@/hooks/useChatService'
import { strictEnter } from '@/utils/event'
import GameBoard from '@c/GameBoard'
import {
  chat,
  game,
  chatMessage,
  gameStart,
  gameUserAction
} from '@/models/Chat'

export default function Room () {
  const router = useRouter()
  const { t, i18n } = useTranslation('room')
  i18n.addResourceBundle('ja', 'room', {
    go: '確定',
    name: '名前',
    exit: '退室',
    'start game!': 'ゲーム開始'
  })

  const name = localStorage.getItem('name') || ''
  if (!name) {
    router.replace('/')
    return null
  }

  const { messages, sendMessage, connect } = useChatService()
  const lastMessage = messages[messages.length - 1]
  const lastGameMessage =
    lastMessage && lastMessage.type === game ? lastMessage : null

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
    sendMessage({ name, type: chat, kind: chatMessage, body: input })
    setInput('')
  }
  const startGame = () => {
    sendMessage({ name, type: game, kind: gameStart, body: 'はじめよう' })
  }
  const sendGameMessage = () => {
    sendMessage({ name, type: game, kind: gameUserAction, body: '' })
  }
  return (
    <Layout title="Top">
      <main>
        <h1 className="title">{t('title', { ns: 'common' })}</h1>
        <p className="description">{t('description', { ns: 'common' })}</p>
        <p>
          {t('name')}: {name}
        </p>
        <div className="divide">
          <div className="left-block">
            <div className="chat">
              {messages
                .filter((msg) => msg.type === chat)
                .map((message, index) => (
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
            </div>
          </div>
          <div className="right-block">
            <GameBoard
              message={lastGameMessage}
              sendMessage={sendGameMessage}
            />
            <button onClick={startGame}>{t('start game!')}</button>
          </div>
        </div>
        <style jsx>{`
          .divide {
            display: flex;
          }
          .left-block {
            flex: 1;
          }
          .chat {
            border: 1px solid black;
          }
          .right-block {
            flex: 1;
          }
        `}</style>
      </main>
    </Layout>
  )
}
