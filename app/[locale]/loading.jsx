"use client"
import React from 'react'
import GridLoader from "react-spinners/GridLoader"

const override = {
    display: 'block',
    margin: '100px auto'
    
}

const LoadingPage = ({loading}) => {
  return (
    <GridLoader
      color="#fff"
      loading={loading}
      cssOverride={override}
      size={10}
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingPage
