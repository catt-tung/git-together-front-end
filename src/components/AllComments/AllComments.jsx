// import * as postService from '../../services/posts';

const AllComments = (props) => {
  const {comments} = props.post

  // const handleDeleteComment = id => {
  //   postService.deleteOneComment(id)
  //   // .then(deletedComment => setPosts(posts.filter(post => post._id !== deletedPost._id)))
  // }

  return ( 
  <>
    <h5>All Comments:</h5>
    {comments.map(comment => 
      <p key={comment._id}>{comment.content}</p>

    )}
  </>

   );
}
 
export default AllComments;