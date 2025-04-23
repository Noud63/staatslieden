"use client"
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const override = {
    display: 'block',
    margin: '180px auto'

}

const LoadingPage = ({loading}) => {
  return (
    <ClipLoader
      color="#fff"
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingPage
