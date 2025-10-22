"use client";
import React from "react";
import { GridLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ loading, size}) => {
  return (
    <GridLoader
      color="#fff"
      loading={loading} // loading state true or false
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
