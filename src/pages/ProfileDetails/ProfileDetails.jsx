import React, { useState, useEffect } from 'react';
import { getDetails } from '../../services/profileService';
import { useLocation } from 'react-router-dom';


const ProfileDetails = () => {

  const [profileDetails, setProfileDetails] = useState({})
  let location = useLocation()

  useEffect(() => {
    getDetails(location.state.profile._id)
    .then(profileData => setProfileDetails(profileData))
  }, [])



  return ( 
    <>
      <h3>{profileDetails.name}'s Page</h3>

      <h2> Project </h2>

      

    </>
  );
}

export default ProfileDetails