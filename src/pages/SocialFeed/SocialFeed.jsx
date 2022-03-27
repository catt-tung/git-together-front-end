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


  return ( 
    <>
      <h1>Social Feed</h1>
      {posts.map((post) => (
        <>
          <h5>{post.content}</h5>
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