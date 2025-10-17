// utils/revalidatePosts.js
import { mutate } from "swr";

export const revalidatePostCaches = async (postId, userId) => {
  await Promise.all([
    mutate("/api/getposts"),
    mutate(`/api/getposts/postsByUserId/${userId}`),
    mutate(`/api/getSinglePost/${postId}`),
  ]);
};
