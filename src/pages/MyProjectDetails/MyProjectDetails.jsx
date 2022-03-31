import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import { getProjectDetails } from '../../services/project';
import { useLocation } from "react-router-dom";
import * as projectService from '../../services/project'
import './MyProjectDetails.css'

const MyProjectDetails = (props) => {
  const location = useLocation()
  const [goals, setGoals] = useState([])
  const [project, setProject] = useState([])
  
  
  useEffect(() => {
    getProjectDetails(location.state.project._id)
    .then(project => setProject(project))
  }, [])
  
  useEffect(() => {
    getProjectDetails(location.state.project._id)
    .then(project=> setGoals(project.goals))
  }, [])
  
  const handleAddGoal = async newGoalData => {
    const updatedProject = await projectService.create(newGoalData, project._id)
    goals.push(newGoalData)
    setProject(updatedProject)
  }
  
  const handleDeleteGoal = async (projectId, goalId) => {
    const newGoals = await projectService.deleteGoal(projectId, goalId)

    setGoals(goals.filter(goal => goal._id !== goalId))

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
                <td className='table-checkbox'>
                  <input type="checkbox"></input>
                </td>
                <td>
                  {goal.goal}
                </td>
                <td>
                  {new Date(goal.date).toLocaleDateString()}
                </td>
                <td>
                  <button onClick={() => handleDeleteGoal(project._id, goal._id)}>delete</button>
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