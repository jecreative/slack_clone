import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import db from '../firebase'

const Header = () => {
  const [channels, setChannels] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchedChannels, setSearchedChannels] = useState([])
  const [{ user }, dispatch] = useStateValue()
  const searchRef = useRef()

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

  const searchChannels = (e) => {
    setSearchInput(e.target.value)
    if (searchInput === '') setSearchedChannels([])
    else
      setSearchedChannels(
        channels !== [] &&
          channels.filter(
            (channel) =>
              channel.name
                .toLowerCase()
                .split(' ')
                .join('')
                .includes(searchInput.toLowerCase()) && channel.name
          )
      )
    console.log(searchedChannels)
  }

  const visitChannel = (id) => {
    if (id) {
      history.push(`/room/${id}`)
      setSearchedChannels([])
      setSearchInput('')
    }
  }

  const logoutUser = () => {
    dispatch({ type: actionTypes.LOGOUT_USER })
  }
  return (
    <header id='header'>
      <div className='header_left'>
        <Avatar
          className='header_avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className='header_search'>
        <div className='header_searchInput'>
          <SearchIcon />
          <input
            type='search'
            ref={searchRef}
            value={searchInput}
            placeholder='Search'
            onChange={searchChannels}
          />
        </div>
        <div
          className={
            searchedChannels.length !== 0
              ? 'search_results active'
              : 'search_results'
          }
        >
          {searchChannels.length !== 0 &&
            searchedChannels.map((channel) => (
              <div key={channel.id}>
                <div className='searchedItem'>
                  <h4>{channel.name}</h4>
                  <ArrowForwardIosIcon
                    onClick={() => visitChannel(channel.id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='header_right'>
        <HelpOutlineIcon />
        <Tooltip title='Logout'>
          <ExitToAppIcon onClick={logoutUser} />
        </Tooltip>
      </div>
    </header>
  )
}

export default Header
