import { useTranslation } from 'react-i18next'
import { Message } from '@/models/Chat'
type Props = {
  message: Message | null
  sendMessage: () => void
}

type Card = {
  name: string
  power: number
  description: string
  effectText: string
}

type State = {
  name: string
}

type UserStatus = {
  lifePoint: number
  magicPoint: number
  states: State[]
}

const GameBoard = ({ message, sendMessage }: Props) => {
  if (message == null) return null
  const { t, i18n } = useTranslation('room')
  i18n.addResourceBundle('ja', 'room', {
    lifePoint: '体力',
    magicPoint: '魔力'
  })
  const selectCard = () => {
    sendMessage()
  }
  const gameBody = JSON.parse(message.body)
  return (
    <div>
      {message.body}
      {gameBody.userStatusList.map((userStatus: UserStatus) => (
        <>
          <div>
            {t('lifePoint')}: {userStatus.lifePoint}
          </div>
          <div>
            {t('magicPoint')}: {userStatus.magicPoint}
          </div>
        </>
      ))}
      {gameBody.cards.map((card: Card, index: number) => (
        <button key={index} onClick={() => selectCard()}>
          <div>{card.name}</div>
          <div>{card.power}</div>
        </button>
      ))}
    </div>
  )
}
export default GameBoard
