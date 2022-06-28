type Chat = string
export const chat: Chat = 'Chat'
type Game = string
export const game: Game = 'Game'
type ChatMessage = string
export const chatMessage: ChatMessage = 'ChatMessage'
type GameStart = string
export const gameStart: GameStart = 'GameStart'
type GameUserAction = string
export const gameUserAction = 'GameUserAction'
export interface Message {
  name: string
  type: Chat | Game
  kind: ChatMessage | GameStart | GameUserAction
  body: string
}
