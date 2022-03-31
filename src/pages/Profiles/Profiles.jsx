import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import { Link } from 'react-router-dom'
import { getDetails } from '../../services/profileService'

const Profiles = ({user}) => {
  const [profiles, setProfiles] = useState([])
  const [userProfile, getProfile] = useState([])

  useEffect(()=> {
    getDetails(user.profile)
  .then(profile => getProfile(profile))
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? 
        <>
          {profiles.map(profile =>
          profile._id === userProfile._id ?
          
          <div key={profile._id}>
            <Link 
            to="/myProjects"
            state={{profile}}
            >
              {profile.name} 
            </Link>
          </div>

          :

          <div key={profile._id}>
            <Link 
            to="/profile"
            state={{profile}}
            >
              {profile.name}
            </Link>
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