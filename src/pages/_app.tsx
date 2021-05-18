import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.1.0/gl-matrix.js" />
            </Head>

            <GeistProvider>
                <Component {...pageProps} />
            </GeistProvider>
        </>
    )
}
