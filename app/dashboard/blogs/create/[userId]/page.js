"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Corrected import for useRouter
import Link from "next/link";

const Page = () => {
  const [title, setTitle] = useState("d");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(""); // Initialize as an empty string
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId: params.userId }),
      });

      if (response.ok) {
        setSuccess("Blog created successfully!");
      }
      const data = await response.json();
      console.log(data);
      // Set success message here
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-zinc-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Create a Blog
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="10"
                required
              ></textarea>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && (
              <div className="text-green-500 flex justify-between items-center">
                {success}
                <button
                  onClick={() => setSuccess("")}
                  className="text-red-500 ml-4"
                >
                  &times;
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
          <div className="mt-4 flex gap-4">
            <Link href="/">
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Go to Home
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
