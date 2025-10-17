"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";



const Spinner = ({ loading, size}) => {
  return (
    <ClipLoader
      color="#fff"
      loading={loading} // loading state true or false
      size={size}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
