const AllComments = (props) => {
  const {comments} = props.post

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