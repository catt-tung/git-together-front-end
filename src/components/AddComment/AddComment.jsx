import React, { useState, useEffect, useRef } from 'react'
import useCollapse from 'react-collapsed'


const AddComment = () => {
  const formElement = useRef()

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  const [formData, setFormData] = useState({
    content: ''
  })

  const [validForm, setValidForm] = useState(false)
  
  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleAddComment = async newPostData => {
    console.log("test")
    // await postService.create(newPostData)
  }

  const handleSubmit = evt => {
		evt.preventDefault()
    handleAddComment(formData)
	}

  return (
    <>
      <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? 'Add Comment' : 'Add Comment'}
      </button>
        
        <section {...getCollapseProps()}>
          <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
            <div>
              <textarea 
                type="text"
                id="name-input"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <button 
              type="submit"
              disabled={!validForm}
            >
              Submit Post
            </button>
          </form>
        </section>
      
      <div>
        <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? 'Collapse' : 'All Comments'}
        </button>
        <section {...getCollapseProps()}>Collapsed comments here!</section>
      </div>

    </>
  )
}
 
export default AddComment;