import { useState, useEffect, useRef } from 'react'
import configs from '@/configs'

type ChatService = [string[], (text: string) => void]

const useChatService = (initialMessage: string): ChatService => {
  const [messages, setMessages] = useState([initialMessage])

  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const isHttps = location.protocol === 'https:'
    const url =
      (isHttps ? 'wss' : 'ws') +
      `://${location.hostname}:${configs.serverPort}${location.pathname}ws`
    console.log('Connecting..')
    const ws = new WebSocket(url)
    socketRef.current = ws
    socketRef.current.onopen = () => console.log('Connected')
    socketRef.current.onmessage = (evt) => {
      setMessages([...messages, evt.data])
    }
    return () => {
      if (!socketRef.current) throw new Error()
      console.log('Disconnecting..')
      socketRef.current.close()
    }
  }, [])

  const sendMessage = (text: string): void => {
    if (!socketRef.current) throw new Error()
    socketRef.current.send(text)
  }

  return [messages, sendMessage]
}

export default useChatService
