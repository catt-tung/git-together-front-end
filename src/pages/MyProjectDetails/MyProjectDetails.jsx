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
        <ul>
        {goals.map(goal => 
          <li key={goal._id}><input type="checkbox"></input>{goal.goal}{new Date(goal.date).toLocaleDateString()
          
          }<button onClick={() => handleDeleteGoal(project._id, goal._id)}>delete</button></li>
          )}
        </ul>
      </div>
      
      <AddGoal projectid={project._id} handleAddGoal={handleAddGoal}/>

    </>
  );
}

export default MyProjectDetails;