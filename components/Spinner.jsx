"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ loading, size}) => {
  return (
    <ClipLoader
      color="#fff"
      loading={loading} // loading state true or false
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
