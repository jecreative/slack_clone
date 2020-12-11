import { useState } from 'react'
import firebase from 'firebase'

import db from '../firebase'
import { useStateValue } from '../context/StateProvider'

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('')
  const [{ user }] = useStateValue()

  const sendMessage = (e) => {
    e.preventDefault()

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

  return (
    <div id='chatInput'>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type='submit' onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInput
