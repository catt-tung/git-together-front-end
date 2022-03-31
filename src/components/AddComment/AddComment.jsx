import React, { useState, useEffect, useRef } from 'react'
import useCollapse from 'react-collapsed'


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

  const handleSubmit = evt => {
		evt.preventDefault()
    props.handleAddComment(props.post._id, formData)
    setFormData({content: ''})
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
            <div className='comment-form'>
              <textarea
                type="text"
                id="comment-input"
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