import React, { useState, useEffect } from 'react';
import { getDetails } from '../../services/profileService';
import { useLocation } from 'react-router-dom';
import { getAvatar } from '../../services/project';



const ProfileDetails = () => {

  const [profileDetails, setProfileDetails] = useState({})
  const [profileAvatar, setAvatar] = useState([])
  let location = useLocation()

  useEffect(() => {
    getDetails(location.state.profile._id)
    .then(profileData => setProfileDetails(profileData))
  }, [])

useEffect(() => {
  getAvatar(profileDetails.gitUser)
  .then(profileAvatar => setAvatar(profileAvatar))
})

  return ( 
    <>
      <h3>
        <img src={profileAvatar} alt="" />
        {profileDetails.name}'s Page
        </h3>

      <h2> Project </h2>

    </>
  );
}

export default ProfileDetails