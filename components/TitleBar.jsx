import React from 'react'

const TitleBar = ({title, titleWidth}) => {
  return (
    <div className="rounded-md bg-white py-2 px-2 text-lg text-yellow-900">
      <span className={titleWidth ? titleWidth : "font-bold"}>{title}</span>
    </div>
  );
}

export default TitleBar
