import React, {useState, useEffect} from "react";
import { getRepos } from "../../services/project";


const MyProjects = () => {

const [repoList, setRepoList] = useState([])

useEffect(() => {
  getRepos()
  .then(repoData => setRepoList(repoData))
}, [])

console.log(repoList)
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
        
    </>
  );
}

export default MyProjects;