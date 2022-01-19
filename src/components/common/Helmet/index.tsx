import { Helmet } from 'react-helmet-async'

export default function AppHelmet() {
  return (
    <Helmet>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;700&display=swap'
        rel='stylesheet'
      ></link>
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;400;600&display=swap'
        rel='stylesheet'
      ></link>
    </Helmet>
  )
}
