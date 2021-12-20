import { Container } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './components/general/Header'
import AppRoutes from './components/pages/routes'

function App() {
  return <Container maxW='container.lg'>
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  </Container>
}

export default App
