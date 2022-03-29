import React, { useState, useRef, useEffect } from 'react';


const AddGoal = (props) => {
    const [validForm, setValidForm] = useState(false)
    const [formData, setFormData] = useState({
      goal: '',
      date: '',
      complete: false,
    })

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const formElement = useRef()

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddGoal(formData)
  }

  return ( 
    <>
      <h5>Add a goal/milestone to this project:</h5>
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
              Puppy's Breed (required)
            </label>
            <input 
              type="date"
              className="form-control"
              id="date-input"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="age-input" className="form-label">
              Puppy's Age
            </label>
            <input 
              type="number"
              className="form-control"
              id="age-input"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-fluid"
              disabled={!validForm}
            >
              Add Goal
            </button>
          </div>
        </form>
    </>
  );
}

export default AddGoal;
