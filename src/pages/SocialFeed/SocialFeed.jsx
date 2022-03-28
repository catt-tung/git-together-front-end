import React, { useState, useEffect } from 'react';
import AddSocialPost from "../AddSocialPost/AddSocialPost";
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts'; 

const SocialFeed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getPosts()
    .then(postsData => setPosts(postsData))
  }, [])

  const handleDeletePost = id => {
    postService.deleteOne(id)
    .then(deletedPost => setPosts(posts.filter(post => post._id !== deletedPost._id)))
  }

  return ( 
    <>
      <h1>Social Feed</h1>
      {posts.map((post) => (
        <>
          <h5>{post.content}</h5>
          <button onClick={() => handleDeletePost(post._id)}>&times;</button>
          <Link
            className='btn btn-sm btn-warning'
            to='/editSocialPost'
            state={{post}}
        >
          Edit
        </Link>
        </>
        ))}
      
      <Link 
        to="/addSocialPost" 
      >
        <button>
          Add Post
        </button>
      </Link>

    </>
      
  );
}

export default SocialFeed;