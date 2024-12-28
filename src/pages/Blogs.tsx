import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

type Props = {};

export default function Blogs({}: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      console.log(BACKEND_URL);

      const token = localStorage.getItem("token");

      if(!token){
        navigate("/signin")
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setPosts(data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-500">Fetching the latest blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Discover Inspiring Blogs
        </h1>
        <button
          onClick={() => navigate("/publish")}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
        >
          + New Blog
        </button>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      Author: {post.authorId || "Unknown"}
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        post.published
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No blogs found. Start by creating your first blog!
        </p>
      )}
    </div>
  );
}
