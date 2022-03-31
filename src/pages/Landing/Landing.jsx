import { useEffect, useState } from 'react';
import { getDetails } from '../../services/profileService';
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  const [profile, setProfile] = useState([])
  const [avatar, setAvatar] = useState([])

  useEffect(() => {
    if (user) {
    getDetails(user.profile)
    .then(profile => setProfile(profile))
    }
    console.log('hello')
  }, [])

  useEffect(() => {
    user ? setAvatar(`https://github.com/${profile.gitUser}.png`) : setAvatar('nothing')

  }, [user, profile.gitUser])
  


  
    
  return (
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'friend'}</h1>
      <img src={user ? avatar : "https://cdn-icons-png.flaticon.com/512/889/889192.png"} alt="Your GitHub Profile Pic"></img>
      
    </main>
  )
}

export default Landing