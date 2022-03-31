import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import * as projectService from '../../services/project'
import { useLocation } from "react-router-dom";


const MyProjectDetails = (props) => {
  const location = useLocation()
  // const [project, setProject] = useState([])

  // useEffect(() => {
  //   projectService.getProjectDetails(location.state.project._id)
  //   .then(projectData => setProject(projectData))
  // }, [])
  // console.log(location.state.project.goals)
  // const goalsNames = Object.entries(location.state.project.goals)
  // console.log(goalsNames)


  return ( 
    <>
      <h1>{location.state.project.repo}</h1>
      <h3>Current Project Status</h3>
      <h5>Repostory name: {location.state.project.repo}</h5>
      <h5>Projected Completion Date: {new Date(location.state.project.completionDate).toLocaleDateString()}</h5>
      <h5>Project Management List</h5>
      <ul>
      {location.state.project.goals.map(goal => 
        <li key={goal._id}>{goal.goal}{new Date(goal.date).toLocaleDateString()}<button>delete</button></li>
        )}
      </ul>
      <AddGoal projectid={location.state.project._id} />
    </>
  );
}

export default MyProjectDetails;