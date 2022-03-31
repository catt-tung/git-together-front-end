import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getDetails } from "../../services/profileService";
import { getRepos, getGoals, deleteOne, getProjectDetails } from "../../services/project";



const MyProjects = ({ user }) => {
const [repoList, setRepoList] = useState([])
const [projects, setProjects] = useState([])
const [profile, getProfile] = useState([])

useEffect(() => {
  getDetails(user.profile)
  .then(profile => getProfile(profile))
  getGoals()
  .then(projectData => setProjects(projectData))
}, [])

console.log(profile)

const handleDeleteProject = id => {
  deleteOne(id)
  .then(deletedProject => {
    setProjects(projects.filter(project => project._id !== deletedProject._id))})
}


  return ( 
    <>
      <h1>List of created projects</h1>
      {projects.map(project => (
        project.owner === profile._id ?
        <div>
          <Link
          to='/project'
          state = {{project}}
          >
          {project.name}
          </Link>

            <Link
              to='/editProject'
              state={{project}}
            >
              <button>
                Edit Project
              </button>
            </Link>
            <button 
            onClick={() => handleDeleteProject(project._id)}
            >
              Delete Project
            </button>
        </div>
        :
        <>
        
        </>
        ))}
        
            <Link
              to='/myProjects/new'
              state = {{repoList}}
            >
              +Create Project
            </Link>
    </>
  );
}

export default MyProjects;