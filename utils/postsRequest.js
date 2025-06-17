
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchPosts() {
try {
   if (!apiDomain) {
     return [];
   }
   const res = await fetch(`${apiDomain}/posts`, {cache: "no-store"}); // server component fetch req needs the full url http://localhost:3000/api

   if (!res.ok) {
     throw new Error("Failed to fetch data!");
   }

   const data = await res.json();

   return data;
} catch (error) {
  console.log(error)
}
 
}

async function getPostsByUserId(userId) {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/postsByUserId/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

async function getSinglepostById(postId) {
  try {
    if (!apiDomain) {
     return [];
   }
    const res = await fetch(`${apiDomain}/posts/${postId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}


async function getUserInfo(id) {
  try {
    const res = await fetch(`${apiDomain}/api/getuserinfo/${id}`);
    const data = await res.json();
    console.log("Data:", data);
    const { name, email, userName, avatar } = data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchPosts,
  getPostsByUserId,
  getSinglepostById,
  getUserInfo
};
