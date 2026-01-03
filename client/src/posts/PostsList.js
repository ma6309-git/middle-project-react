import { useEffect, useState } from "react";
import Axios from "axios";
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const { data } = await Axios.get("http://localhost:5000/api/posts");
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  if (posts.length === 0) return <h1>Louding</h1>;
  return (
    <>
      {posts.map((post, index) => {
        return <div>{post.title}</div>;
      })}
    </>
  );
};

export default PostsList;
