import { useHistory } from 'react-router-dom'

import db from '../firebase'

const SidebarOption = ({
  Icon,
  title,
  id,
  addChannelOption,
  setShowChannels,
  showChannels,
  setShowTopics,
  showTopics,
}) => {
  const history = useHistory()

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`)
    } else {
      history.push(title)
    }
  }

  const addChannel = () => {
    const channelName = prompt('Please enter channel name')

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      })
    }
  }

  const showChannel = () => {
    setShowChannels(!showChannels)
  }

  const showTopic = () => {
    setShowTopics(!showTopics)
  }

  return (
    <div
      className='sidebarOption'
      onClick={
        addChannelOption
          ? addChannel
          : setShowChannels
          ? showChannel
          : setShowTopics
          ? showTopic
          : selectChannel
      }
    >
      {Icon && <Icon className='sidebarOption_icon' />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className='sidebarOption_channel'>
          <span className='sidebarOption_hash'>#</span> {title}
        </h3>
      )}
    </div>
  )
}

export default SidebarOption
