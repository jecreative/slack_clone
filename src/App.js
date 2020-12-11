import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useStateValue } from './context/StateProvider'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'

const App = () => {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <main>
              <Sidebar />
              <Switch>
                <Route path='/room/:roomId' component={Chat} />
                <Route path='/'>
                  <h1>Welcome</h1>
                </Route>
              </Switch>
            </main>
          </>
        )}
      </Router>
    </div>
  )
}

export default App
