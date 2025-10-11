"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    // Fetch all blogs when the component loads
    async function allBlogs() {
        try {
            const response = await fetch("http://localhost:8000/blogshow");
            const data = await response.json();
            console.log(data);
            setBlogs(data); // Store data in state
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    }

    useEffect(() => {
        allBlogs();
    }, []);

    async function deleteBlog(id) {
        try {
            await fetch(`http://localhost:8000/blog/delete/${id}`);
            allBlogs();

        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    }

    async function editBlog(id){
        const response=await fetch(`http://localhost:8000/blog/edit/${id}`);
        
    }


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>

            {/* If blogs exist, render them */}
            {blogs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 text-sm mb-2">
                                Author: {blog.authorName}
                            </p>
                            <p className="text-gray-500 text-sm mb-4">
                                Date: {blog.blogDate}
                            </p>
                            <p className="text-gray-700 mb-3">{blog.content}</p>
                            <div className="flex justify-evenly">
                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {blog.categories}
                                </span>
                                <button className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" onClick={() => editBlog(blog._id)}>Edit</button>
                                <button className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" onClick={() => deleteBlog(blog._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No blogs found.</p>
            )}
        </div>
    );
}
