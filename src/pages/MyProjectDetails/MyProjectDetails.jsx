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

  return ( 
    <>
      <h1>Project Details Component</h1>
      <h3>{location.state.project.repo}</h3>
      <h5>Projected Completion Date: {new Date(location.state.project.completionDate).toLocaleDateString()}</h5>
      <AddGoal projectid={location.state.project._id} />
    </>
  );
}

export default MyProjectDetails;