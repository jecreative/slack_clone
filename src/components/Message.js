import { Avatar } from '@material-ui/core'

const Message = ({ message: { message, timestamp, user, userImage } }) => {
  return (
    <div id='message'>
      {userImage === null ? (
        <Avatar
          className='header_avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
      ) : (
        <img src={userImage} alt={user} />
      )}

      <div className='message_info'>
        {user === null ? (
          <h4>
            Guest User{' '}
            <span className='message_timestamp'>
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </h4>
        ) : (
          <h4>
            {user}{' '}
            <span className='message_timestamp'>
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </h4>
        )}

        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
