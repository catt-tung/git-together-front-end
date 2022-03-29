import React, { useState, useEffect } from 'react';
import AddGoal from "../../components/Goals/Goals";
import * as goalService from '../../services/project'

const AddProject = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    goalService.getGoals()
    .then(goalsData => setGoals(goalsData))
  }, [])

  return ( 
    <>
      <h1>Page to Add New Projects</h1>
      <AddGoal goals={goals} />
    </>
    
  );
}

export default AddProject;