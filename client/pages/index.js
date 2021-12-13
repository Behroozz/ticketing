import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  )
}

// If we want to fetch data during the server side rendering process
// static method
// executed on server and sometime on browser
// Hard Refresh, Click on link from different domain, Type URL --> Server
// Navigate from one page to another --> Client
LandingPage.getInitialProps = async (context) => {
  console.log('I am on the server landing page!')
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')
  // show up as props on landing page
  return data
}

export default LandingPage
