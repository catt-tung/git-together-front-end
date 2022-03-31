import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getDetails } from "../../services/profileService";
import { getRepos, getGoals, deleteOne, getProjectDetails } from "../../services/project";
import "./MyProjects.css"



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

const handleDeleteProject = id => {
  deleteOne(id)
  .then(deletedProject => {
    setProjects(projects.filter(project => project._id !== deletedProject._id))})
}


  return ( 
    <>
      <h1>List of created projects</h1>

        <Link
          to='/myProjects/new'
          state = {{repoList}}
          className="create-project"
        >
          <button className="create-button">
            Create Project
          </button>
        </Link>

      <section className="all-projects">
      {projects.map(project => (
        project.owner === profile._id ?
        <div className="project-container">
          
          <Link
              to='/project'
              state = {{project}}
              className="project-link"
          >
            <img className="project-image" src={project.image.includes(".jpg") || project.image.includes(".png") ? project.image : "https://cdn-icons-png.flaticon.com/512/889/889192.png"} alt="Your Project" ></img>
          </Link>
          
          <div className="project-actions">
            <Link
              to='/project'
              state = {{project}}
              className="project-link"
            >
              {project.name}
            </Link>
            <br></br>
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
        </div>
        :
        <>
        </>
        ))}
        </section>
    </>
  );
}

export default MyProjects;