import { useTranslation } from 'react-i18next'
import { Message } from '@/models/Chat'
import { useEffect } from 'react';
import { type } from 'os';

type Props = {
  message: Message | null
  sendMessage: (s: string) => void
}

type Card = {
  id: string
  name: string
  power: number
  description: string
  effectText: string
}

type State = {
  name: string
}

type User = {
  id: string
  name: string
  gameData: GameData
}

type GameData = {
  lifePoint: number
  magicPoint: number
  states: State[]
  cards: Card[]
}

type GameInfo = {
  turnCount: number
  turnUserId: number
}

type GameBody = {
	gameInfo: GameInfo
	myData: User
	othersData: User[]
}

const GameBoard = ({ message, sendMessage }: Props) => {
  if (message == null) return null
  const { t, i18n } = useTranslation('room')
  i18n.addResourceBundle('ja', 'room', {
    LifePoint: '体力',
    MagicPoint: '魔力'
  })

  const selectCard = (card: Card) => {
    const body:string = card.name
    sendMessage(body)
  }
  const gameBody: GameBody = JSON.parse(message.body)
  console.log(gameBody)
  const toggleLocale = (locale: string) => {
    g

  }
  return (
    <div>
      <div>
        <div>
         {gameBody.myData.name}
        </div>
        <div>
          {t('LifePoint')}: {gameBody.myData.gameData.lifePoint}
        </div>
        <div>
          {t('MagicPoint')}: {gameBody.myData.gameData.magicPoint}
        </div>
      </div>
      {gameBody.myData.gameData.cards.map((card: Card, index: number) => (
        <button key={index} onClick={() => selectCard(card)}>
          <div>{card.name}</div>
          <div>{card.power}</div>
        </button>
      ))}
      {message.body}
    </div>
  )
}
export default GameBoard
