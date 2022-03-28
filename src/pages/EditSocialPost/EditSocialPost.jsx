import { useState, useRef, useEffect } from "react"
import * as postService from '../../services/posts'; 
import { useNavigate, Link, useLocation } from "react-router-dom";

const EditSocialPost = (props) => {
  const formElement = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState(location.state.post)
  const [validForm, setValidForm] = useState(true)
  
  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleEditPost = async newPostData => {
    await postService.update(newPostData)
    navigate('/socialFeed')
  }

  const handleSubmit = evt => {
		evt.preventDefault()
    handleEditPost(formData)
	}
  
  return (
  <>
    <h1>Edit Post</h1>
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
  </>
  );
}

export default EditSocialPost;