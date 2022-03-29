import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";


const MyProjectDetails = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    
  })

  return ( 
    <>
      <h1>Project Details Component</h1>
      <AddGoal />
    </>
  );
}

export default MyProjectDetails;