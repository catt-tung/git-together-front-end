import React, {useState, useEffect} from "react";
import * as projectService from "../../services/project";


const MyProjects = () => {
const [repoList, setRepoList] = useState([])
const [projects, setProjects] = useState([])

useEffect(() => {
  projectService.getRepos()
  .then(repoData => setRepoList(repoData))
}, [])

useEffect(() => {
  projectService.getGoals()
  .then(projectData => setProjects(projectData))
}, [])

console.log(repoList)
console.log(projects)
  return ( 
    <>
      <h1>Here are your projects</h1>
      <ul>
        {repoList.map(repo => (
            
        <li>
          {repo}
        </li>
          ))
        }
      </ul>
      <h1>List of created projects</h1>
      {projects.map(project => (
        <p>{project.repo}</p>
      ))}
    </>
  );
}

export default MyProjects;