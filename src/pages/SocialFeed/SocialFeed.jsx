import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts';
import AddComment from '../../components/AddComment/AddComment';
import AllComments from '../../components/AllComments/AllComments';
import useCollapse from 'react-collapsed'

const SocialFeed = (props) => {
  const [posts, setPosts] = useState([])

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

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
          <div key={post._id} className='post-container'>
            <h5>{post.content}</h5>
            <h5>By: {post.author}</h5>
            <AddComment post={post}/>

            <button onClick={() => handleDeletePost(post._id)}>Delete</button>

            <Link
              to='/editSocialPost'
              state={{post}}
            >
              <button>
                Edit
              </button>
            </Link>

            {/* Post's comments section */}
            <div>
              <button
                {...getToggleProps({
                  onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                })}
              >
                {isExpanded ? 'Collapse' : 'All Comments'}
              </button>
                
              <section {...getCollapseProps()}>
                <AllComments post={post}/>
              </section>
            </div>
          
          </div>
        </>
      ))}

    </>
      
  );
}

export default SocialFeed;