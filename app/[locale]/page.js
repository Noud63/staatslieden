import React from "react";
import AddPost from "@/components/AddPost";
import GetAllPosts from "@/components/GetAllPosts";
import LeesDit from "@/components/LeesDit";
import { fetchPosts } from "@/utils/postsRequest";

export default async function Home() {
  
  const initialData = await fetchPosts(); // Fetch on server

  return (
    <>
      <LeesDit />
      <AddPost />
      <GetAllPosts initialData={initialData}/>
    </>
  );
}


// "use client"
// import React from 'react'
// import GridLoader from "react-spinners/GridLoader"

// const override = {
//     display: 'block',
//     margin: '100px auto'
    
// }

// const LoadingPage = ({loading}) => {
//   return (
//     <GridLoader
//       color="#fff"
//       loading={loading}
//       cssOverride={override}
//       size={10}
//       aria-label="Loading Spinner"
//     />
//   );
// }

// export default LoadingPage
