"use client"
// import { fetchPosts } from '@/utils/postsRequest';
import SinglePost from '@/components/SinglePost'
import useSWR from "swr";
import Spinner from "@/components/Spinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PostByUserPage =({params}) => {

const userId = params.postId; // PostId is the userId in this context

const { data, error, isLoading } = useSWR(
  `/api/getposts/postsByUserId/${userId}`,
  fetcher
);

if (isLoading)
  return (
    <div>
      <Spinner loading={isLoading} />
    </div>
  );

if (error) return <div className="flex justify-center text-xl text-white mt-20">Error loading posts!</div>;

  return (
    <div className="py-4">
      {data && data.map((post) => (
          <SinglePost post={post} key={post._id} comments={post.comments}/>
        ))}
    </div>
  );
}

export default PostByUserPage
