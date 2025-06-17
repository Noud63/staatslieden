import React from 'react'
import { getSinglepostById } from '@/utils/postsRequest';

const SharedPostPage = async ({ params }) => {
  const { postId } = params;

  // fetch post data here
  const post = await getSinglepostById(postId); // your own function
  console.log('SharedPost', post);  

  if (!post) return notFound();

  return <div>
    <div>{post.name}</div>
    <div>{post.postContent}</div>
    <div>{post.images[0]}</div>
  </div>;
};

export default SharedPostPage
