import { useState } from 'react'
import firebase from 'firebase'
import SendIcon from '@material-ui/icons/Send'

import db from '../firebase'
import { useStateValue } from '../context/StateProvider'

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [{ user }] = useStateValue()

  const sendMessage = (e) => {
    e.preventDefault()
    //Validate Chat Input
    if (input === '') {
      setError('Message cannot be empty')
      setTimeout(() => {
        setError('')
      }, 5000)
    } else {
      if (channelId) {
        db.collection('rooms').doc(channelId).collection('messages').add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
        })
      }
      setInput('')
    }
  }

  return (
    <div id='chatInput'>
      <form>
        {error && <p className='error'>{error}</p>}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />

        <button type='submit' onClick={sendMessage}>
          <SendIcon />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
