import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from '@c/Footer'
import { useTranslation } from 'react-i18next'

type Props = {
  children?: ReactNode
  title: string
}

export default function Layout({
  children,
  title = 'This is the default title',
}: Props) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gaURL = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  const dangerouslyHTML = {
    __html: `
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date())
    gtag('config', '${gaId}', {
      page_path: window.location.pathname,
    })`,
  }
  const { i18n } = useTranslation()
  const toggleLocale = async () => {
    await i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')
    typeof window === 'undefined' || sessionStorage.setItem('lang', i18n.language)
  }
  return (
    <div className="container">
      <Head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <script async src={gaURL} />
            <script dangerouslySetInnerHTML={dangerouslyHTML} />
          </>
        )}
        <title>DevUtils | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={toggleLocale}>
        Change Language {i18n.language} &gt;{' '}
        {i18n.language === 'en' ? 'ja' : 'en'}
      </button>

      {children}

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
