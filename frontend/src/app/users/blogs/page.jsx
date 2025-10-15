"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
   const[categories,setCategories]=useState('');
  // Fetch all blogs when the component loads
  async function allBlogs() {
    try {
      const response = await fetch("http://localhost:8000/blogshow", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setBlogs(data); // Store data in state
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  useEffect(() => {
    allBlogs();
  }, []);

  async function categoriesFilter(){
    const response=await fetch(`http://localhost:8000/blogfilter/?categories=${categories}`);
    const data=await response.json();
    console.log(data);
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <div className="border border-gray-700 rounded-2xl shadow-md p-4 bg-gray-900 w-45">
        <label for="cars">Filter by Categories:</label>
        <select
          value={(e)=>setCategories(e.target.value)}
          className="w-full border border-gray-600 rounded-xl   bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="">Select Category</option>
          <option value={categories}>Romantic</option>
          <option value={categories}>Thriller</option>
          <option value={categories}>Comedy</option>
          <option value={categories}>Inspiring</option>
        </select>
        <label htmlFor="author" className="flex mt-2">Filter by Author :</label>
        <select
          value="author"
          className="w-full border border-gray-600 rounded-xl   bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="">Select Category</option>
          <option value="">Select Category</option>
         
        </select>

      </div>
      {/* If blogs exist, render them */}
      <div className="flex  ml-50">
        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-2xl shadow-md p-4 bg-gray-900 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-2 text-white">{blog.title}</h2>
                <p className="text-gray-400 text-sm mb-2">Author: {blog.authorName}</p>
                <p className="text-gray-500 text-sm mb-4">Date: {blog.blogDate}</p>
                <p className="text-gray-300 mb-3">{blog.content}</p>
                <span className="inline-block bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
                  {blog.categories}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
