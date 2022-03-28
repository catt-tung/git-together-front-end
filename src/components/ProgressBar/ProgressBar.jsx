import { useState } from 'react';

const ProgressBar = () => {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount()
  }

  return ( 
    <>
      <div class="progress">
        <div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </>
  );
}

export default ProgressBar;