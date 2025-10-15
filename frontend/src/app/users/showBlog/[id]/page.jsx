"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ShowBlog() {
    const { id } = useParams(); // ✅ get blog ID from URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(`http://localhost:8000/show/${id}`);
                const data = await res.json();
                console.log(data)
                setBlog(data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        }
        if (id) fetchBlog();
    }, [id]);

    if (!blog)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading blog...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-950 text-white p-10">
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-xl">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <p className="text-gray-400 mb-2">
                    By <span className="text-blue-400">{blog.authorName}</span>
                </p>
                <p className="text-gray-500 text-sm mb-6">
                    {new Date(blog.blogDate).toLocaleDateString()}
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {blog.content}
                </p>
                <div className="mt-4">
                    <span className="inline-block bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                        {blog.categories}
                    </span>
                </div>
            </div>
        </div>
    );
}
