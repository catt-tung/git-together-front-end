import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts';
import AddComment from '../../components/AddComment/AddComment';
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

  const handleDeleteComment = async (postId, commentId) => {
    // sends delete req to back end
    const updatedPost = await postService.deleteOneComment(postId, commentId)
    // sets state for addition of post's comment
    setPosts(posts.map(post => post._id !== updatedPost._id ? post : updatedPost))
  }

  const handleAddComment = async (id, newCommentData) => {
    // sends post req to back end
    const updatedPost = await postService.createComment(id, newCommentData)
    // sets state for addition of post's comment
    setPosts(posts.map(post => post._id !== updatedPost._id ? post : updatedPost))
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
            <h5>By: {post.author.name}</h5>
            <AddComment post={post} handleAddComment={handleAddComment}/>

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
                <>
                  <h5>All Comments:</h5>
                    {post.comments.map(comment => 
                      <>
                        <p key={comment._id}>
                          <h6>"{comment.content}"</h6> - {comment.author.name}
                        </p>
                        <button onClick={async () => await handleDeleteComment(post._id, comment._id)}>X</button>
                      </>
                  )}
                </>
              </section>
            </div>
          
          </div>
        </>
      ))}

    </>
      
  );
}

export default SocialFeed;