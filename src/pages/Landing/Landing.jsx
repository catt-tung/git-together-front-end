import React, { useState, useEffect } from 'react';
import { getDetails } from '../../services/profileService';
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  const [profile, setProfile] = useState([])

  useEffect(() => {
    getDetails(user.profile)
    .then(profile => setProfile(profile))
  }, [])

  const avatar = `https://github.com/${profile.gitUser}.png`

  return (
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'friend'}</h1>
      <img src={avatar} alt="Your GitHub Profile Pic"></img>
      
    </main>
  )
}

export default Landing
