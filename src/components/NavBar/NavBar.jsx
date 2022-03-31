import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
      <header className="App-header">
                <Link to="/">
                  <img className='logo-img' src='https://cdn-icons-png.flaticon.com/512/889/889192.png' alt="Cat icon"></img>
                </Link>
        <div>Welcome, {user.name}</div>
        <nav>
          <ul className='nav-bar'>
            <li className="logo">
            </li>
            <li><Link to ="/myProjects">My Projects</Link></li>
            <li><Link to ="/socialFeed">Social Feed</Link></li>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/changePassword">Change Password</Link></li>
            <li><Link to="" onClick={handleLogout}>Log Out</Link></li>
          </ul>
        </nav>
        </header>
      :
      <header className="App-header">
        Please Log In!
        <nav>
          <ul className='nav-bar'>
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
