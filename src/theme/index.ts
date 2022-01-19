import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Fira Code, monospace',
    body: 'Fira Sans, sans-serif',
    mono: 'Fira Code, monospace',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
