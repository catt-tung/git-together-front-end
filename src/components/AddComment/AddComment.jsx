import React, { useState } from 'react'
import useCollapse from 'react-collapsed'


const AddComment = () => {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  return (
    <>
      <div>
        <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? 'Collapse' : 'All Comments'}
        </button>
        <section {...getCollapseProps()}>Collapsed comments here!</section>
      </div>
    </>
  )
}
 
export default AddComment;