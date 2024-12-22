"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Not authenticated");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      document.cookie = " ";
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome {user.name}!
          </h1>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div className="text-black flex font-medium flex-col gap-4">
              <Link href={`/dashboard/blogs/create/${user._id}`}>
                <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Create a blog
                </button>
              </Link>
              <Link href={`/dashboard/blogs/allblogs/${user._id}`}>
                <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                  My blogs
                </button>
              </Link>

              <Link href="/">
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Go to Home
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
