import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import { Link } from 'react-router-dom'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? 
        <>
          {profiles.map(profile=>
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