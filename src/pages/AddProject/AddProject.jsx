import React, { useState, useEffect, useRef } from 'react';
import AddGoal from "../../components/Goals/Goals";
import { getGoals, getRepos, createProject } from '../../services/project'
import { useNavigate } from 'react-router-dom';
import { getDetails } from '../../services/profileService';


const AddProject = ({ user }) => {
	const navigate = useNavigate()
  const [goals, setGoals] = useState([]) 
	const [repos, setRepos] = useState([])
	const [profile, setProfile] = useState([])

  useEffect(() => {
    getGoals()
    .then(goalsData => setGoals(goalsData))
		getDetails(user.profile)
  	.then(profile => setProfile(profile))
  }, [profile.gitUser, user.profile])

	useEffect(() => {
		getRepos(profile.gitUser)
		.then(repos => setRepos(repos))
		repos.map(repo => {
			repo.toString()
		})
	}, [profile.gitUser])

  const [formData, setFormData] = useState({
		name: '',
    repo: '',
    photo: '',
    completionDate: '',
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
		console.log(evt.target.value)
		console.log(formData)
  }

  const [validForm, setValidForm] = useState(false)

  const formElement = useRef()

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleAddProject = async newProjectData => {
    await createProject(newProjectData)
    navigate('/myProjects')
  }

	const handleSubmit = evt => {
		console.log(formData)
		evt.preventDefault()
    handleAddProject(formData)
	}

  return ( 
    <>
      <h1>Page to Add New Projects</h1>
      <h1>Create a New Project</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
            Project Name:
					</label>
					<input 
						type="test"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
					<label htmlFor="repo-input" className="form-label">Choose Repository:</label>
						<select name="repo" id="repo-input" value={formData.repo} onChange={handleChange}>
						{repos.map(repo => 
							<option >
							{repo}	
							</option>
							)}
							</select>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="photo-input" className="form-label">
						Enter an image link
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