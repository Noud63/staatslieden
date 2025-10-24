"use client"
import React from 'react'
import { GridLoader } from 'react-spinners'

const override = {
    display: 'block',
    margin: '180px auto'
}

const LoadingPage = ({loading, size}) => {
  return (
    <GridLoader
      color="#fff"
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingPage