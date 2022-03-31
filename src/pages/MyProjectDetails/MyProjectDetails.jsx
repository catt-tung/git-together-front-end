import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import { getProjectDetails } from '../../services/project';
import { useLocation } from "react-router-dom";
import * as projectService from '../../services/project'

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
      <h1>{project.repo}</h1>
      <h3>Current Project Status</h3>
      <h5>Repostory name: {project.repo}</h5>
      <h5>Projected Completion Date: {new Date(project.completionDate).toLocaleDateString()}</h5>
      <h5>Project Management List</h5>
      <ul>
      {goals.map(goal => 
        <li key={goal._id}>{goal.goal}{new Date(goal.date).toLocaleDateString()
        
        }<button onClick={() => handleDeleteGoal(project._id, goal._id)}>delete</button></li>
        )}
      </ul>
      <AddGoal projectid={project._id} handleAddGoal={handleAddGoal}/>

    </>
  );
}

export default MyProjectDetails;