import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import * as projectService from '../../services/project'
import { useLocation } from "react-router-dom";


const MyProjectDetails = (props) => {
  const location = useLocation()
  const handleDeleteGoal = (projectid, goalid) => {
    projectService.deleteGoal(projectid, goalid)
  }

  return ( 
    <>
      <h1>{location.state.project.repo}</h1>
      <h3>Current Project Status</h3>
      <h5>Repostory name: {location.state.project.repo}</h5>
      <h5>Projected Completion Date: {new Date(location.state.project.completionDate).toLocaleDateString()}</h5>
      <h5>Project Management List</h5>
      <ul>
      {location.state.project.goals.map(goal => 
        <li key={goal._id}>{goal.goal}{new Date(goal.date).toLocaleDateString()}<button onClick={() => handleDeleteGoal(location.state.project._id, goal._id)}>delete</button></li>
        )}
      </ul>
      <AddGoal projectid={location.state.project._id} />
    </>
  );
}

export default MyProjectDetails;