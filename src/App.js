import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { useStateValue } from './context/StateProvider'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className='app'>
      <Router>
        {!user && <Redirect to='/login' />}
        {!user ? (
          <>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/register' exact>
              <Register />
            </Route>
          </>
        ) : (
          <>
            <Header />
            <main>
              <Sidebar />
              <Switch>
                <Route path='/room/:roomId' component={Chat} />
              </Switch>
            </main>
          </>
        )}
      </Router>
    </div>
  )
}

export default App
