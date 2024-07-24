import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app'
import '../styles/globals.css'
import {ChatProvider} from '../context/ChatContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: any }>) {
  return (
    <SessionProvider session={session}>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </SessionProvider>
  )
}