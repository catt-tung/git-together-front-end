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
    }, [location.state.profile._id, profileDetails._id])
    
    const avatar = `https://github.com/${profileDetails.gitUser}.png`
    
    userProjects.map(project => 
      console.log(project.name)
    )

  return ( 
    <>
      <h3>
        {profileDetails.name}'s Page
      </h3>
      
      <img src={avatar} alt="" />

      <h2>Projects</h2>
      
      {userProjects.map(project => 
        <div className='profile-project-container'>
          <Link
            to='/project'
            state = {{project}}
          >
            <img 
              className="profile-project-image" 
              src={project.image && (project.image.includes(".jpg") || project.image.includes(".png")) ? project.image : "https://cdn-icons-png.flaticon.com/512/889/889192.png"} 
              alt="Your Project" 
            >
            </img>
            {project.name}
          </Link>
        </div>    
        )}
        
    </>
  );
}

export default ProfileDetails