import React, { useState, useEffect} from 'react';
import AddGoal from "../../components/Goals/Goals";
import { getProjectDetails, calcProgress } from '../../services/project';
import { useLocation } from "react-router-dom";
import * as projectService from '../../services/project'
import './MyProjectDetails.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router-dom';
import { getDetails } from '../../services/profileService';


const MyProjectDetails = (user) => {
  const location = useLocation()
  const [goals, setGoals] = useState([])
  const [project, setProject] = useState([])
  const [progress, setProgress] = useState(0)
  const [gitLink, setLink] = useState([])
  const [profile, setProfile] = useState([])
  
  
  useEffect(() => {
    getDetails(location.state.project.owner)
    .then(profile => setProfile(profile))
    getProjectDetails(location.state.project._id)
    .then(project => {
      setProject(project)
      setGoals(project.goals)
    })
  }, [])
  
  useEffect(() => {
    setLink(`https://github.com/${profile.gitUser}/${project.repo}`)
    setProgress(calcProgress(goals))
  }, [goals])

  const handleAddGoal = async newGoalData => {
    const updatedProject = await projectService.create(newGoalData, project._id)
    goals.push(newGoalData)
    setProject(updatedProject)
  }
  
  const handleDeleteGoal = async (projectId, goalId) => {
    const newGoals = await projectService.deleteGoal(projectId, goalId)
    setGoals(goals.filter(goal => goal._id !== goalId))
  }
  
  const handleUpdateComplete = async (goalId, projectId) => {
    const updatedProject = await projectService.updateGoal(goalId, projectId)
    setGoals(updatedProject.goals)
    setProject(updatedProject)
  }

  const owner = user.user.profile === project.owner

  return ( 
    <>
      <h1>{project.name}</h1>
      <img className='project-details-image' src={project.image}></img>
      <div className="project-details-container" id="current-project-status">
        <h3>Current Project Status</h3>
        <h5>Repostory: 
          <Link className="repo-link-in-current-project"
          to={gitLink}>
          {project.repo}
          </Link>
          </h5>
        <h5>Projected Completion Date: {new Date(project.completionDate).toLocaleDateString()}</h5>
        <span id="progress-bar-aligner">
          <ProgressBar animated now={progress} />
        </span>
      </div>
      {owner ?
      <>
      <div id='project-management-list'>
        <h3>Project Management List</h3>
          <div>
            <>
            <tr>
              <th>
                Done?
              </th>
              <th>
                Goal
              </th>
              <th>
                Complete by
              </th>
              <th>
                Remove
              </th>
            </tr>
            {goals.map(goal => 
              <>
                <tr>
                  <td className='align-center'>
                    <input 
                    type="checkbox" 
                    onClick={() => handleUpdateComplete(goal._id, project._id)}
                    defaultChecked={goal.complete}
                    >
                    </input>
                  </td>
                  <td>
                    {goal.goal}
                  </td>
                  <td>
                    {new Date(goal.date).toLocaleDateString()}
                  </td>
                  <td id='align-center'>
                    <button onClick={() => handleDeleteGoal(project._id, goal._id)}>&times;</button>
                  </td>
                </tr>
              </>
              )}
            </>
          </div>
      </div>
      <div className='project-details-container' id='add-goal'>
        <AddGoal projectid={project._id} handleAddGoal={handleAddGoal}/>
      </div>
      </>
      
      :
      <>
      <div id='project-management-list'>
        <h3>Project Management List</h3>
          <div>
            <>
            <tr>
              <th>
                Done?
              </th>
              <th>
                Goal
              </th>
              <th>
                Complete by
              </th>
            </tr>
            {goals.map(goal => 
              <>
                <tr>
                  <td className='align-center'>
                    <input 
                    type="checkbox" 
                    defaultChecked={goal.complete}
                    disabled
                    >
                    </input>
                  </td>
                  <td>
                    {goal.goal}
                  </td>
                  <td>
                    {new Date(goal.date).toLocaleDateString()}
                  </td>
                </tr>
              </>
              )}
            </>
          </div>
      </div>
      </>
      }
    </>
  )
}

export default MyProjectDetails;