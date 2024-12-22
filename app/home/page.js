"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/home`);
        if (!response.ok) {
          throw new Error("Unexpected error occurred");
        }
        const data = await response.json();
        console.log("Found blogs:", data);

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">All Blogs</h1>
          <div className="mb-4">
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            {" | "}
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Dashboard
            </Link>
          </div>
          {!blogs?.length ? (
            <div className="text-gray-600">No blogs found</div>
          ) : (
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li key={blog._id} className="border-b pb-4 last:border-b-0">
                  <h2 className="text-xl text-black font-semibold">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{blog.content}</p>
                  <div className="flex gap-[3vw] mt-3">
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <p className="text-zinc-500 mt-1">Published By : {blog.userId.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
