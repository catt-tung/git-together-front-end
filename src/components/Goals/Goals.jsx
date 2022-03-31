import React, { useState, useRef, useEffect } from 'react';
import * as projectService from '../../services/project'
import './Goals.css'

const AddGoal = (props) => {
    const [validForm, setValidForm] = useState(false)
    const [formData, setFormData] = useState({
      goal: '',
      date: '',
      complete: false,
    })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const formElement = useRef()

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])


  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddGoal(formData)
    setFormData({goal: ''})
  }

  return ( 
    <>
      <h3>Add a goal/milestone to this project:</h3>
      <div className='goals-form'>
        <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="goal-input" className="form-label">
              Goal (required)
            </label>
            <input 
              type="text"
              className="form-control"
              id="goal-input"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gorm-group mb-3">
            <label htmlFor="date-input" className="form-label">
              Projected Complete Date
            </label>
            <input 
              type="date"
              className="form-control"
              id="date-input"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="age-input" className="form-label">
              Completed?
            </label>
            <input 
              type="checkbox"
              id="complete-input"
              name="complete"
              value={formData.complete}
              onChange={handleChange}
            />
          </div>
          <span>
            <div className="d-grid">
              <button
                id="goal-btn"
                type="submit"
                disabled={!validForm}
              >
                Add Goal
              </button>
            </div>
          </span>
        </form>
      </div>
    </>
  );
}

export default AddGoal;
