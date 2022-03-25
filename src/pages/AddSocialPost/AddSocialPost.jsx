import { useState, useRef, useEffect } from "react"

const AddSocialPost = (props) => {
  const formElement = useRef()
  const [formData, setFormData] = useState({
    content: ''
  })  
  
  return (
  <>
    <h1>Add Post</h1>
      <form autoComplete="off">
        <div>
          <textarea 
            type="text"
            id="name-input"
            name="content"
            value={formData.content}
            required
          />
        </div>
      <button 
        type="submit"
      >
        Submit Post
      </button>
    </form>
  </>
  );
}
 
export default AddSocialPost;