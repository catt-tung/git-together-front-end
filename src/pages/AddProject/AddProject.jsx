import React, { useState, useEffect } from 'react';
import AddGoal from "../../components/Goals/Goals";
import * as goalService from '../../services/project'

const AddProject = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    goalService.getGoals()
    .then(goalsData => setGoals(goalsData))
  }, [])

  const [formData, setFormData] = useState({
    repo: '',
    photo: '',
    completionDate: '',
  })

  return ( 
    <>
      <h1>Page to Add New Projects</h1>
      <h1>Create a New Project</h1>
      <form autoComplete="off">
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-control"
          >
						Select a repository:
					</label>
					<input 
						type="select"
						className="form-control"
						id="repo-input"
						name="repo"
            value={formData.repo}
						required
					/>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="photo-input" className="form-label">
						Upload a photo
					</label>
					<input 
						type="text"
						className="form-control"
						id="age-input"
						name="age"
            value={formData.image}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="breed-input" className="form-label">
						Completion date goal:
					</label>
					<input 
						type="date"
						className="form-control"
						id="date-input"
						name="completionDate"
            value={formData.completionDate}
						required
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
					>
						Create Project
					</button>
				</div>
			</form>
      {/* <AddGoal goals={goals} /> */}
    </>
    
  );
}

export default AddProject;