import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

// https://nextjs.org/docs/messages/css-global
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
}

// If we want to fetch data during the server side rendering process
// static method
// executed on server and sometime on browser
// Hard Refresh, Click on link from different domain, Type URL --> Server
// Navigate from one page to another --> Client
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  return {
    pageProps,
    currentUser: data.currentUser
  }
}

export default AppComponent
