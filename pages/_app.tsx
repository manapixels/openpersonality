import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { extendTheme } from '@chakra-ui/react'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'

const t = {
   colors: {
      brand: {
         900: '#1a365d',
         800: '#153e75',
         700: '#2a69ac',
      },
   },
   components: {
      Button: {
         variants: {
            black: {
               bg: 'black',
               color: 'white',
               _hover: {
                  bg: 'gray.900',
                  _disabled: {
                     bg: 'gray.900',
                  },
               },
            },
         },
      },
   },
}

const theme = extendTheme(t)

const { chains, provider, webSocketProvider } = configureChains(
   [chain.goerli],
   [
      alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY, priority: 0 }),
      publicProvider({ priority: 1 }),
   ]
)

const client = createClient({
   autoConnect: true,
   provider,
   webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
   const [showChild, setShowChild] = useState(false)

   useEffect(() => {
      setShowChild(true)
   }, [])

   if (!showChild) {
      return null
   }

   if (typeof window === 'undefined') {
      return <></>
   }

   return (
      <WagmiConfig client={client}>
         <ChakraProvider theme={theme}>
            <Head>
               <title>OpenPersonality</title>
               <meta
                  name="description"
                  content="Mint your personality traits"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/apple-touch-icon.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon-32x32.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon-16x16.png"
               />
            </Head>
            <Flex height="100vh">
               <Sidebar />
               <Box flex="1" background="gray.100" overflow="auto" className="custom-scrollbar">
                  <Component {...pageProps} />
               </Box>
            </Flex>
         </ChakraProvider>
      </WagmiConfig>
   )
}

export default MyApp
