import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

function App() {
  return (
    <div className='app'>
      <Router>
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
      </Router>
    </div>
  )
}

export default App
