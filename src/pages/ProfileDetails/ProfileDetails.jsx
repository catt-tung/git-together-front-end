import React, { useState, useEffect } from 'react';
import { getDetails } from '../../services/profileService';
import { useLocation, Link } from 'react-router-dom';
import { getAvatar, getProjects } from '../../services/project';


const ProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState({})
  const [userProjects, setProjects] = useState([])
  let location = useLocation()

  useEffect(() => {
    getDetails(location.state.profile._id)
    .then(profileData => setProfileDetails(profileData))
    getProjects()
      .then(projects => {
        setProjects(projects.filter(project => project.owner === profileDetails._id))
      })
    }, [])
    
    const avatar = `https://github.com/${profileDetails.gitUser}.png`
    



  return ( 
    <>
      <h3>
        <img src={avatar} alt="" />
        {profileDetails.name}'s Page
        </h3>

      <h2> Projects </h2>
      <ul>

      {userProjects.map(project => {
        <>
        <li>
          <Link
          to='/project'
        state = {{project}}>
          {project.repo}
          </Link>   
        </li>
        </>
        })}
        </ul>
    </>
  );
}

export default ProfileDetails