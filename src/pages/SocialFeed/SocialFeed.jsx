import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as postService from '../../services/posts';
import AddComment from '../../components/AddComment/AddComment';
import useCollapse from 'react-collapsed'
import './SocialFeed.css'

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

  function getPic(url){
    return `https://github.com/${url}.png`
  }

  return ( 
    <>
      <h1>Social Feed</h1>

      <Link 
        to="/addSocialPost"
        className='add-post'
      >
        <button className='add-post-btn'>
          Add Post
        </button>
      </Link>

      {/* Toggle on/off collapsed comments */}
      <button
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? 'Collapse' : 'All Comments'}
      </button>

      {posts.map((post) => (
        <>
          <div key={post._id} className='post-container'>
            <div>
              <img 
                className="post-author-picture" 
                src={getPic(post.author.gitUser)} alt="It's You!" 
              />
              <Link
                to='/profile'
                state={post.author}
                className="author-profile-link"
              >
                {post.author.gitUser}
              </Link>
            </div>

            <h4 className='post-body'>{post.content}</h4>

            Posted on: {new Date(post.createdAt).toLocaleDateString()} <br/>

            <AddComment post={post} handleAddComment={handleAddComment}/>

            {post.author._id === props.user.profile ?
              <>
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              
                <Link
                  to='/editSocialPost'
                  state={{post}}
                  className="edit-post"
                >
                  <button>
                    Edit
                  </button>
                </Link>
              </>
             : 
              <>
              </>
             }

            {/* Post's comments section */}
            <div>
                
              <section className='comments-container' {...getCollapseProps()}>
                <>
                  <h5>All Comments:</h5>
                    {post.comments.map(comment => 
                      <div className='comment'>
                        <p key={comment._id}>
                          <div className='comment-details'>
              <img 
                className="post-author-picture" 
                src={getPic(comment.author.gitUser)} alt="It's You!" 
              />
              <Link
                to='/profile'
                state={post.author}
                className="author-profile-link"
              >
                {comment.author.gitUser}
              </Link><br/>
                          </div>
                          <h6 className='comment-body'>{comment.content}</h6>
                          Posted on: {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                        {comment.author._id === props.user.profile ?
                          <>
                            <button className='delete-comment' onClick={async () => await handleDeleteComment(post._id, comment._id)}>
                              X
                            </button>
                          </>
                        :
                          <>
                          </>
                        }
                    </div>
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