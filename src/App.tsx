import { Container, Flex, Spacer } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import AppHelmet from './components/common/Helmet'
import AppHeader from './components/general/Header'
import AppFooter from './components/general/Footer'
import AppRoutes from './components/pages/routes'

function App() {
  return (
    <BrowserRouter>
      <AppHelmet />
      <Container maxW='container.xl'>
        <Flex direction='column' minH='100vh'>
          <AppHeader />
          <AppRoutes />
          <Spacer />
          <AppFooter />
        </Flex>
      </Container>
    </BrowserRouter>
  )
}

export default App
