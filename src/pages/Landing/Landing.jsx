import { getDetails } from '../../services/profileService';
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  let profile = {}
  let avatar = ""

  if (user) {
    profile = getDetails(user.profile)
    avatar = `https://github.com/${profile.gitUser}.png`
    console.log(avatar)
    console.log(profile)
  }

  
    
  return (
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'friend'}</h1>
      <img src={user ? avatar : "https://cdn-icons-png.flaticon.com/512/889/889192.png"} alt="Your GitHub Profile Pic"></img>
      
    </main>
  )
}

export default Landing
