import React from 'react'
import { useSelector } from 'react-redux';

const Progress = () => {
  const targets = useSelector((state) => state.targets);

  return (
    <ul>
      {targets.map(target => (<li key={target.id}>{target.name}</li>))}
    </ul>
  )
}

export default Progress