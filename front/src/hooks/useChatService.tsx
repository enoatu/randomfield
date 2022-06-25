import { useState, useRef } from 'react'
import configs from '@/configs'
import { Message } from '@/models/Chat'

const useChatService = (initMessage: Message) => {
  const [messages, setMessages] = useState<Message[]>([initMessage])
  const socketRef = useRef<WebSocket | null>(null)
  const connect = (query: string) => {
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
  }

  const sendMessage = (message: Message): void => {
    if (!socketRef.current) throw new Error()
    socketRef.current.send(JSON.stringify(message))
  }

  return { messages, sendMessage, connect }
}

export default useChatService
