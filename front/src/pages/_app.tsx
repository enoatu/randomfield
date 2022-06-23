import { AppProps } from 'next/app'
import '@/configs/i18n'

const isServer = () => typeof window === 'undefined'

const MyApp = ({ Component, pageProps }: AppProps) =>
  !isServer() && <Component {...pageProps} />

export default MyApp
