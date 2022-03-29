import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts';
// import * as commentService  from '../../services/comments'
import AddComment from '../../components/AddComment/AddComment';
import useCollapse from 'react-collapsed'

const SocialFeed = () => {
  const [posts, setPosts] = useState([])

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  useEffect(() => {
    postService.getPosts()
    .then(postsData => setPosts(postsData))
    // commentService.getComments()
    // .then(commentsData => setComments(commentsData))
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
          <div className='post-container'>
            <h5>{post.content}</h5>
            <h5>By: {post.author}</h5>
            <AddComment state={post._id.comments}/>

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
                {/* {post.comments.map((comment) => (
                  <h6>
                    {comment}
                  </h6>
                ))} */}
              </section>
            </div>
          
          </div>
        </>
      ))}

    </>
      
  );
}

export default SocialFeed;