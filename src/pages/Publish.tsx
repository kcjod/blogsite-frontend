import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function Publish({}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/signin")
      }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest();
  };

  const sendRequest = async () => {
    setTitle("");
    setContent("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log(BACKEND_URL);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/blogs");
      } else {
        throw new Error("Something error occured");
      }
    } catch (err) {
      alert("Failed to create the blog. Please try again.");
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Create a New Blog
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-screen-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Publish
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Publish;
