import ReactDOM from 'react-dom'
import { FC } from 'react'

const el = document.createElement('div')
document.body.appendChild(el)

const Portal: FC = ({ children }) => {
  return ReactDOM.createPortal(children, el)
}

export default Portal
