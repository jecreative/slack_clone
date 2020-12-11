import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

import SidebarOption from './SidebarOption'
import db from '../firebase'
import { useStateValue } from '../context/StateProvider'

const Sidebar = () => {
  const [channels, setChannels] = useState([])
  const [showChannels, setShowChannels] = useState(false)
  const [showTopics, setShowTopics] = useState(false)
  const [{ user }] = useStateValue()

  const history = useHistory()

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    })
  }, [])

  const addChannel = () => {
    const channelName = prompt('Please enter channel name')

    if (channelName) {
      db.collection('rooms')
        .add({
          name: channelName,
        })
        .then((ref) => {
          // console.log(ref.id)
          db.collection('rooms')
            .doc(ref.id)
            .get()
            .then((snapshot) => {
              if (ref.id) {
                history.push(`/room/${ref.id}`)
              } else {
                history.push(snapshot.data().name)
              }
            })
        })
    }
    setShowChannels(true)
  }

  return (
    <div id='sidebar'>
      <div className='sidebar_header'>
        <div className='sidebar_info'>
          <h2>Creative Media</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <Tooltip title='Add Channel' placement='bottom-start'>
          <CreateIcon onClick={addChannel} />
        </Tooltip>
      </div>
      <SidebarOption
        Icon={ExpandMoreIcon}
        title='Channels'
        setShowChannels={setShowChannels}
        showChannels={showChannels}
      />

      {showChannels ? (
        <>
          <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' />
          {channels.map((channel) => (
            <SidebarOption
              title={channel.name}
              id={channel.id}
              key={channel.id}
            />
          ))}
        </>
      ) : (
        ''
      )}
      <hr />
      <SidebarOption
        Icon={showTopics ? ExpandLessIcon : ExpandMoreIcon}
        title={showTopics ? 'Show Less' : 'Show More'}
        setShowTopics={setShowTopics}
        showTopics={showTopics}
      />
      {showTopics && (
        <>
          <SidebarOption Icon={InsertCommentIcon} title='Threads' />
          <SidebarOption Icon={InboxIcon} title='Mentions & Reactions' />
          <SidebarOption Icon={DraftsIcon} title='Saved Items' />
          <SidebarOption Icon={BookmarkBorderIcon} title='Channel Browser' />
          <SidebarOption Icon={PeopleAltIcon} title='People & User Groups' />
          <SidebarOption Icon={AppsIcon} title='Apps' />
          <SidebarOption Icon={FileCopyIcon} title='File Browser' />
        </>
      )}

      <hr />
    </div>
  )
}

export default Sidebar
