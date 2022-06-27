import { useState, useRef } from 'react'
import configs from '@/configs'
import { Message } from '@/models/Chat'

const useChatService = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const socketRef = useRef<WebSocket | null>(null)
  const [handleError, setHandleError] = useState<() => void>(() => {}) //eslint-disable-line

  const isConnectOpen = () => {
    if (!socketRef.current) throw new Error()
    return socketRef.current.readyState === socketRef.current.OPEN
  }

  const connect = (query: string, handleError: () => void) => {
    setHandleError(() => handleError)
    const isHttps = location.protocol === 'https:'
    const url =
      (isHttps ? 'wss' : 'ws') +
      `://${location.hostname}:${configs.serverPort}/ws?${query}`
    console.log('Connecting..')
    const ws = new WebSocket(url)
    socketRef.current = ws
    socketRef.current.onopen = () => console.log('Connected')
    socketRef.current.onmessage = (evt) => {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(evt.data)])
    }
    const connectInterval = window.setInterval(() => {
      if (!isConnectOpen()) {
        clearInterval(connectInterval)
        handleError()
      }
    }, 500)
    return () => {
      clearInterval(connectInterval)
    }
  }

  const sendMessage = (message: Message): void => {
    if (!socketRef.current) throw new Error()
    if (!isConnectOpen()) return handleError()
    socketRef.current.send(JSON.stringify(message))
  }

  return { messages, sendMessage, connect, setHandleError }
}

export default useChatService
