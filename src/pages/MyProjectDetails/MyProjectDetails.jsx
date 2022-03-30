import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import * as projectService from '../../services/project'
import { useLocation } from "react-router-dom";


const MyProjectDetails = (props) => {
  const location = useLocation()
  const [goals, setGoals] = useState([])
  console.log(location)
  useEffect(() => {
    projectService.getGoals()
    .then(goalsData => setGoals(goalsData))
  }, [])

  return ( 
    <>
      <h1>Project Details Component</h1>
      <AddGoal projectid={location.state.project._id} />
    </>
  );
}

export default MyProjectDetails;