import { getPostsByUserId } from '@/utils/postsRequest'
import SinglePost from '@/components/SinglePost'

const PostByUserPage = async({params}) => {

const data = await getPostsByUserId(params.id)

  return (
    <div className="py-4">
      {data.posts.map((post) => (
          <SinglePost post={post} key={post._id} comments={post.comments}/>
        ))}
    </div>
  );
}

export default PostByUserPage
