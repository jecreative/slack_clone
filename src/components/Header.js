import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'

const Header = () => {
  const [{ user }, dispatch] = useStateValue()

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
        <SearchIcon />
        <input type='search' placeholder='Search' />
      </div>
      <div className='header_right'>
        <HelpOutlineIcon />
        <ExitToAppIcon onClick={logoutUser} />
      </div>
    </header>
  )
}

export default Header
