import { useState, useRef, useEffect } from "react"
import * as postService from '../../services/posts'; 

const AddSocialPost = (props) => {
  const formElement = useRef()

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

  const handleAddPost = async newPostData => {
    const newPost = await postService.create(newPostData)
  }

  const handleSubmit = evt => {
		evt.preventDefault()
    handleAddPost(formData)
	}
  
  return (
  <>
    <h1>Add Post</h1>
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
 
export default AddSocialPost;