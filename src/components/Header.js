import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

const Header = () => {
  return (
    <header id='header'>
      <div className='header_left'>
        <Avatar
          className='header_avatar'
          // alt={user?.displayName}
          // src={user?.photoUrl}
        />
        <AccessTimeIcon />
      </div>
      <div className='header_search'>
        <SearchIcon />
        <input type='search' placeholder='Search' />
      </div>
      <div className='header_right'>
        <HelpOutlineIcon />
      </div>
    </header>
  )
}

export default Header
