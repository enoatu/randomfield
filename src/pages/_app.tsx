import { AppProps } from 'next/app'
import '@/configs/i18n'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
