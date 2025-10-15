"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [blogDate, setDate] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const router = useRouter();

  async function formSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, authorName, blogDate, content, categories }),
      });
      await response.json();
      setTitle("");
      setAuthorName("");
      setDate("");
      setContent("");
      setCategories("");
      router.push("/users/blogs");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">
      <form
        onSubmit={formSubmit}
        className="bg-gray-900/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md border border-gray-700 hover:border-blue-600 transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          ✍️ Create a New Blog
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Share your thoughts, stories, and ideas with the world 🌍
        </p>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="font-medium text-gray-300 mb-1 block">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title..."
            className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="font-medium text-gray-300 mb-1 block">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="font-medium text-gray-300 mb-1 block">
            Blog Date
          </label>
          <input
            type="date"
            id="date"
            value={blogDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="font-medium text-gray-300 mb-1 block">
            Blog Content
          </label>
          <textarea
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label htmlFor="category" className="font-medium text-gray-300 mb-1 block">
            Category
          </label>
          <select
            id="category"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="">Select Category</option>
            <option value="Romantic">💖 Romantic</option>
            <option value="Thriller">🕵️‍♂️ Thriller</option>
            <option value="Comedy">😂 Comedy</option>
            <option value="Inspiring">🌟 Inspiring</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}
