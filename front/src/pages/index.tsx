import { useState, useEffect } from 'react'
import Layout from '@c/Layout'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export default function Top () {
  const router = useRouter()
  const { t, i18n } = useTranslation('top')
  i18n.addResourceBundle('ja', 'portalInputName', {
    'Please Input Your Name!': '名前を入力してください',
    'Go!': '確定'
  })

  useEffect(() => {
    localStorage.clear()
  }, [])

  const [name, setName] = useState('')
  const click = () => {
    if (name === '') return
    localStorage.setItem('name', name)
    router.replace('/room')
  }
  return (
    <Layout title="Top">
      <main>
        <h1 className="title">{t('title', { ns: 'common' })}</h1>
        <p className="description">{t('description', { ns: 'common' })}</p>
        <div className="wrapper">
          <p>{t('Please Input Your Name!')}</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={click}>{t('Go!')}</button>
        </div>
        <style jsx>{`
          wrapper {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </main>
    </Layout>
  )
}
