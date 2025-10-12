"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [authorName, setAuthor] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [editId, setEditId] = useState(null); // track which blog is being edited
  const [showModal, setShowModal] = useState(false);

  // Fetch all blogs
  async function allBlogs() {
    try {
      const response = await fetch("http://localhost:8000/blogshow");
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  useEffect(() => {
    allBlogs();
  }, []);

  // Delete blog
  async function deleteBlog(id) {
    try {
      await fetch(`http://localhost:8000/blog/delete/${id}`, { method: "DELETE" });
      allBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }

  // Load blog data into form for editing
  async function editBlog(id) {
    try {
      const response = await fetch(`http://localhost:8000/blog/edit/${id}`);
      const data = await response.json();
      setShowModal(true);
      setTitle(data.title);
      setAuthor(data.authorName);
      setBlogDate(data.blogDate);
      setContent(data.content);
      setCategories(data.categories);
      setEditId(id); // store current editing blog id
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  }

  // Save edited blog
  async function editBlogs(e) {
    e.preventDefault(); // prevent reload

    if (!editId) {
      alert("Please select a blog to edit.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/blog/edit/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, authorName, blogDate, content, categories }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Blog updated successfully!");
        setTitle("");
        setAuthor("");
        setBlogDate("");
        setContent("");
        setCategories("");
        setEditId(null);
        allBlogs();
      } else {
        alert(result.message || "Failed to update blog.");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>

      {/* All blogs */}
      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
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
                <button
                  onClick={() => editBlog(blog._id)}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm hover:bg-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}

      {/* Edit form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            <form className="space-y-4" onSubmit={editBlogs}>
              <h2 className="text-2xl font-semibold text-center mb-4">Edit Blog</h2>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-1 text-sm font-medium">Title</label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="authorName" className="block mb-1 text-sm font-medium">Author</label>
                <input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="blogDate" className="block mb-1 text-sm font-medium">Date</label>
                <input
                  type="date"
                  id="blogDate"
                  value={blogDate || ""}
                  onChange={(e) => setBlogDate(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block mb-1 text-sm font-medium">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  rows="4"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="categories" className="block mb-1 text-sm font-medium">Category</label>
                <select
                  id="categories"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="romantic">Romantic</option>
                  <option value="thriller">Thriller</option>
                  <option value="comedy">Comedy</option>
                  <option value="inspiring">Inspiring</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
