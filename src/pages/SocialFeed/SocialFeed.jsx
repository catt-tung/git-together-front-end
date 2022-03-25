import React, { useState } from 'react';
import AddSocialPost from "../AddSocialPost/AddSocialPost";
import { Link } from 'react-router-dom'

const SocialFeed = () => {
  const [posts, setPosts] = useState([])

  const handleAddPost = newPostData => {
    setPosts([...posts, newPostData])
  }

  return ( 
    <>
      <h1>Social Feed</h1>
      
      <Link 
        to="/addSocialPost" 
        handleAddPost={handleAddPost}
      >
        <button>
          Add Post
        </button>
      </Link>

    </>
      
  );
}

export default SocialFeed;