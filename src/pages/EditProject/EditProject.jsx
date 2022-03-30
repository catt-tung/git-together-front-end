import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as projectService from '../../services/project'

const EditProject = (props) => {
  const formElement = useRef()
  const location = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(location.state.project)
  const [validForm, setValidForm] = useState(true)

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleEditProject = async newProjectData => {
    await projectService.update(newProjectData)
    navigate('/:id') //need to check this to go to navigate back to project details page
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    handleEditProject(formData)
  }

  return ( 
    <>
      <h1>Edit Project</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="repo-input" className="form-label">
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
						id="image-input"
						name="image"
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
            value={formData.date}
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
    </>
  );
}

export default EditProject;