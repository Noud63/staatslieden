"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading}) => {
  return (
    <ClipLoader
      color="#fff"
      loading={loading} // loading state true or false
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
