import React from 'react'

const TitleBar = ({title}) => {
  return (
    <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-900">
      <span className="font-bold">{title}</span>
    </div>
  );
}

export default TitleBar
