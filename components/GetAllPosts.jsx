"use client";
import SinglePost from "./SinglePost";
import useSWR from "swr";
import Spinner from "./Spinner";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const GetAllPosts = ({initialData}) => {

const { data, error, isLoading } = useSWR("/api/getposts", fetcher, {
  
    fallbackData: initialData, // Use preloaded data first
    revalidateOnMount: true, // Don't fetch again on mount, already have fresh data
    revalidateOnFocus: true, // Refetch when user revisits tab (great for UX)
    revalidateOnReconnect: true, // Refetch when internet reconnects
  });

   if (error)
     return (
       <div className="mx-auto mt-8 flex min-h-[200px] w-full max-w-[620px] flex-col items-center justify-center rounded-lg text-2xl text-white">
         <Image
           src="/images/halloween.png"
           alt="error"
           width={145}
           height={145}
           sizes="100vw"
           className="h-[145px] w-[145px]"
         />
         <span>failed to load data!</span>
         <span>Refresh the page!</span>
       </div>
     );
   if (isLoading)
     return (
       <div>
         <Spinner loading={isLoading} />
       </div>
     );

  // console.log("Posts:", data);

  return (
    <div className="mx-auto flex w-full max-w-[670px] flex-grow flex-col rounded-lg py-4">
      {
        data && data.map((post) => (
          <div key={post._id}>
            <SinglePost post={post} />
        </div>
        ))}
    </div>
  );
};

export default GetAllPosts;
