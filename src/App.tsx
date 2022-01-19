import { Container } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import AppHelmet from './components/common/Helmet'
import AppHeader from './components/general/Header'
import AppRoutes from './components/pages/routes'

function App() {
  return (
    <Container maxW='container.lg'>
      <AppHelmet />
      <BrowserRouter>
        <AppHeader />
        <AppRoutes />
      </BrowserRouter>
    </Container>
  )
}

export default App
