import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type Props = {};

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export default function Blog({}: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the blog id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      console.log(BACKEND_URL);
      const token = localStorage.getItem("token");

      if(!token){
        navigate("/signin")
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data.blog);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the blog post:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-500">Loading the blog...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500">Blog not found!</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Author: {post.authorId || "Unknown"} |{" "}
          <span className="font-semibold">
            {post.published ? "Published" : "Draft"}
          </span>
        </p>
        <div className="text-gray-700 text-lg">{post.content}</div>
        <div className="mt-6">
          <button
            onClick={() => navigate("/blogs")}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}
