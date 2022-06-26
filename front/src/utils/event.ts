import { KeyboardEvent } from 'react'
export const strictEnter = (
  parentEvent: KeyboardEvent<HTMLInputElement>,
  event: () => void
) => {
  // keydownである必要がある
  if (parentEvent.type !== 'keydown') {
    throw new Error('keydownイベントでありません')
  }
  // IME対策(日本語変換時に実行されないように)
  // @ts-ignore // 特定のブラウザにしかisComposingは対応していないため
  if (parentEvent.isComposing) return
  // 長押しではない(何度も実行されないように) + Enter
  if (parentEvent.repeat || parentEvent.keyCode !== 13) return
  // 実行
  event()
}
