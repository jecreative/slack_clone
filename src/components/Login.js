import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'

import { auth, provider } from '../firebase'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'

const Login = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
        history.push('/room/dOKp9ngM4V5CX5eAknX9')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const signInWithEmail = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })
  }

  return (
    <div id='login'>
      <div className='login_container'>
        <div className='login_header'>
          <div></div>
          <div className='login_header_center'>
            <img
              src='https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg'
              alt='slack logo'
            />
          </div>

          <div className='login_header_right'>
            New to Slack?
            <Link to='/register'>Create an account</Link>
          </div>
        </div>
        <div className='login_subheader'>
          <h1>Sign in to Slack</h1>
          <p>
            Continue with the Google account or email address you use to sign
            in.
          </p>
        </div>
        <div className='login_google'>
          <Button onClick={signInWithGoogle}>
            <i className='devicon-google-plain'></i>
            Continue with Google
          </Button>
        </div>
        <div className='login_hr'>
          <hr />
          <span>OR</span>
        </div>
        <div className='login_form'>
          <form>
            <input
              type='email'
              placeholder='Email'
              autoComplete='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='login_email'>
              <Button onClick={signInWithEmail}>Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
