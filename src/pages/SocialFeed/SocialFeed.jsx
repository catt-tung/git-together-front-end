import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts';
import AddComment from '../../components/AddComment/AddComment';

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
      <Link 
        to="/addSocialPost" 
      >
        <button>
          Add Post
        </button>
      </Link>

      {posts.map((post) => (
        <>
          <h5>{post.content}</h5>
          <AddComment />
          <button onClick={() => handleDeletePost(post._id)}>&times;</button>
          <Link
            className='btn btn-sm btn-info'
            to='/editSocialPost'
            state={{post}}
        >
          Edit
        </Link>
        </>
        ))}
      

    </>
      
  );
}

export default SocialFeed;