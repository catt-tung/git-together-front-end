import React, { useState, useEffect } from 'react';
import { getDetails } from '../../services/profileService';
import { useLocation } from 'react-router-dom';
import { getRepos } from '../../services/project';

const ProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState({})
  let location = useLocation()

  useEffect(() => {
    getDetails(location.state.profile._id)
    .then(profileData => setProfileDetails(profileData))
  }, [])

  
  console.log(getRepos(profileDetails.gitUser))
  return ( 
    <>
      <h3>{profileDetails.name} Deets</h3>

      <h2>{profileDetails.gitUser} repos</h2>
      <div>
        
        </div>
      

    </>
  );
}

export default ProfileDetails