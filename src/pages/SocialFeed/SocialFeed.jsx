import React, { useState, useEffect } from 'react';
import AddSocialPost from "../AddSocialPost/AddSocialPost";
import { Link } from 'react-router-dom'
import { getPosts } from '../../services/posts';

const SocialFeed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
    .then(postsData => setPosts(postsData))
  }, [])


  const handleAddPost = newPostData => {
    setPosts([...posts, newPostData])
  }

  return ( 
    <>
      <h1>Social Feed</h1>
      {posts.map((post) => (
          <h5>{post._id}</h5>
        ))}
      
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