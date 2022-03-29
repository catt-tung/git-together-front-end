import React, { useState, useEffect, useRef } from 'react'
import useCollapse from 'react-collapsed'
import * as postService from '../../services/posts';


const AddComment = (props) => {
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
    console.log(props.post._id)
    await postService.createComment(props.post._id, newCommentData)
  }

  const handleSubmit = evt => {
		evt.preventDefault()
    handleAddComment(formData)
    // alert("comment submitted!")
	}
  console.log(formData.content)

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
              Submit Comment
            </button>
          </form>
        </section>
    </>
  )
}
 
export default AddComment;