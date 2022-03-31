import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getRepos, getGoals } from "../../services/project";



const MyProjects = () => {
const [repoList, setRepoList] = useState([])
const [projects, setProjects] = useState([])

// useEffect(() => {
//   getRepos()
//   .then(repoList => setRepoList(repoList))
// }, [])

useEffect(() => {
  getGoals()
  .then(projectData => setProjects(projectData))
}, [])


console.log(projects)
  return ( 
    <>
    
      <h1>List of created projects</h1>
      {projects.map(project => (
        <div>
          <Link
          to='/project'
          state = {{project}}>
          {project.repo}
          </Link>

            <Link
              to='/editProject'
              state={{project}}
            >
              <button>
                Edit Project
              </button>
            </Link>

        </div>
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