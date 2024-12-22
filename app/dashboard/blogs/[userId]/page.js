"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const BlogDisplay = () => {
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/dashboard/blogs/${params.userId}`);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, [params.userId]);

  return <div>hii User {params.userId}</div>;
};

export default BlogDisplay;
