import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import { getProjectDetails, calcProgress } from '../../services/project';
import { useLocation } from "react-router-dom";
import * as projectService from '../../services/project'
import './MyProjectDetails.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { render } from '@testing-library/react';


const MyProjectDetails = (props) => {
  const location = useLocation()
  const [goals, setGoals] = useState([])
  const [project, setProject] = useState([])
  const [progress, setProgress] = useState(0)
  
  
  useEffect(() => {
    getProjectDetails(location.state.project._id)
    .then(project => setProject(project))
    getProjectDetails(location.state.project._id)
    .then(project=> setGoals(project.goals))
    setProgress(calcProgress(goals))
  }, [goals, location.state.project._id])
  
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
  
  
  return ( 
    <>
      <h1>{project.name}</h1>
      <img src={project.image}></img>
      <h2>{project.repo}</h2>
      <div className="project-container" id="current-project-status">
        <h3>Current Project Status</h3>
        <h5>Repostory name: {project.repo}</h5>
        <h5>Projected Completion Date: {new Date(project.completionDate).toLocaleDateString()}</h5>
      </div>
      <div>
      <ProgressBar animated now={progress} />
</div>
      <div className='project-container' id='project-management-list'>
        <h3>Project Management List</h3>
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
                <td className='align-center'>
                  <button onClick={() => handleDeleteGoal(project._id, goal._id)}>&times;</button>
                </td>
              </tr>
            </>
            )}
        </>
      </div>
      <div className='project-container' id='add-goal'>
        <AddGoal projectid={project._id} handleAddGoal={handleAddGoal}/>
      </div>
    </>
  );
}

export default MyProjectDetails;