import React, { useState, useEffect, useRef } from 'react';
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

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const [validForm, setValidForm] = useState(false)

  const formElement = useRef()

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
  }


  return ( 
    <>
      <h1>Page to Add New Projects</h1>
      <h1>Create a New Project</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="repo-input" className="form-control"
          >
            Select a repository:
					</label>
					<input 
						type="select"
						className="form-control"
						id="repo-input"
						name="repo"
            value={formData.repo}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
						required
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
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