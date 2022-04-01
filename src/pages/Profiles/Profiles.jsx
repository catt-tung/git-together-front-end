import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import { Link } from 'react-router-dom'
import { getDetails } from '../../services/profileService'
import './Profiles.css'

const Profiles = ({user}) => {
  const [profiles, setProfiles] = useState([])
  const [userProfile, getProfile] = useState([])
  const [avatar, setAvatar] = useState([])

  useEffect(()=> {
    getDetails(user.profile)
    .then(profile => getProfile(profile))
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))

  }, [user.profile])

  useEffect(()=> {
    profiles.map(profile => {
      profile.avatar = `https://github.com/${profile.gitUser}.png`
    })

  }, [profiles, profiles.avatar])

  return (
    <>
      <h1>All Profiles</h1>
      {profiles.length ? 
        <>
          {profiles.map(profile =>
          profile._id === userProfile._id ?
          
          <div key={profile._id}>
            <section className="profile-card-on-profiles-page">
              <img className="profile-image-on-profiles-page" src={profile.avatar} alt="" />
              <Link 
              to="/myProjects"
              state={{profile}}
              >
                {profile.name} 
              </Link>
            </section>
          </div>

          :

          <div key={profile._id}>
            <section>
              <img className="profile-image-on-profiles-page" src={profile.avatar} alt="" />
              <Link 
              to="/profile"
              state={{profile}}
              >
                {profile.name}
              </Link>
            </section>
          </div>
          )}
        </>
        
      :
        <p>No profiles yet</p>
      }
    </>
  )
}

export default Profiles