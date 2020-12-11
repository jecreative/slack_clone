import Button from '@material-ui/core/Button'

import { auth, provider } from '../firebase'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'

const Login = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <div id='login'>
      <div className='login_container'>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt=''
        />
        <h1>Sign in to Slack Clone</h1>
        <Button onClick={signIn}>
          <i className='devicon-google-plain'></i>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}

export default Login
