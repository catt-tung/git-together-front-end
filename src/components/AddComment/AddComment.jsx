import React, { useState, useEffect, useRef } from 'react'
import useCollapse from 'react-collapsed'
import * as commentService  from '../../services/comments'


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

  const handleAddComment = async newCommentData => {
    // Push comment into posts
    
    commentService.create(newCommentData)
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
    </>
  )
}
 
export default AddComment;