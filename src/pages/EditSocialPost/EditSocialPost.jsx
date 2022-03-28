import { useState, useRef, useEffect } from "react"
import * as postService from '../../services/posts'; 
import { useNavigate } from "react-router-dom";

const EditSocialPost = (props) => {

  return (
  <>
    <h1>Edit Post</h1>
      {/* <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}> */}
      <form autoComplete="off">
        <div>
          <textarea 
            type="text"
            id="name-input"
            name="content"
            // value={formData.content}
            // onChange={handleChange}
            required
          />
        </div>
      <button 
        type="submit"
        // disabled={!validForm}
      >
        Submit Post
      </button>
    </form>
  </>
  );
}
 
export default EditSocialPost;