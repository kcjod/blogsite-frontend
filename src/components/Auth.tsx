import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth({ type }: { type: "signin" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendRequest();
  }

  const sendRequest = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log(BACKEND_URL);

    try {
      console.log(`${BACKEND_URL}/api/v1/user/${type}`);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, {
        email: email,
        password: password,
      });
      const jwt = response.data;
      localStorage.setItem("token", jwt.token);
      navigate("/blogs");
    } catch (err) {
      alert("Email or password is incorrect");
    }
  };

  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-center items-center px-6 lg:px-10 py-10 lg:py-0">
      <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
        {type === "signup" ? "Create an account" : "Welcome back!!"}
      </h1>
      <p className="text-gray-500 mb-6 text-center lg:text-left">
        {type === "signup" ? "Already have an account?" : "Not a member?"}{" "}
        {type === "signup" ? (
          <Link to="/signin" className="text-black">
            Sign in
          </Link>
        ) : (
          <Link to="/signup" className="text-black">
            Sign Up
          </Link>
        )}
      </p>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={handleEmail}
            type="email"
            id="email"
            placeholder="m@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={handlePassword}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
