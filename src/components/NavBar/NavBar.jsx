import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
      <header className="App-header">
        <nav>
          <ul className='nav-bar'>
            <li>Welcome, {user.name}</li>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
            <li><Link to="/changePassword">Change Password</Link></li>
            <li><Link to ="/socialFeed">Social Feed</Link></li>
            <li><Link to ="/myProjects">My Projects</Link></li>
          </ul>
        </nav>
        </header>
      :
      <header className="App-header">
        Please Log In!
        <nav>
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      }
    </>
  )
}

export default NavBar
