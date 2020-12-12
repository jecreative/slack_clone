import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'

import { auth } from '../firebase'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/login')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
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
            Have an account?
            <Link to='/login'>Sign In</Link>
          </div>
        </div>
        <div className='login_subheader'>
          <h1>Sign up for Slack</h1>
          <p></p>
        </div>
        <div className='login_form'>
          <form>
            <input
              type='email'
              placeholder='Email'
              autoComplete='new-username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='login_email'>
              <Button onClick={register}>Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
