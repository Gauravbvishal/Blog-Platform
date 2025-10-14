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
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <form
        className="bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md border border-gray-700"
        onSubmit={formSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create a New Blog
        </h2>

        {/* Title */}
        <label htmlFor="title" className="font-medium text-gray-300 mb-1 block">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full mb-4 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        {/* Author */}
        <label htmlFor="author" className="font-medium text-gray-300 mb-1 block">
          Author Name
        </label>
        <input
          type="text"
          id="author"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author name"
          className="w-full mb-4 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        {/* Date */}
        <label htmlFor="date" className="font-medium text-gray-300 mb-1 block">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={blogDate}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        {/* Content */}
        <label htmlFor="content" className="font-medium text-gray-300 mb-1 block">
          Content
        </label>
        <textarea
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="w-full mb-4 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          required
        />

        {/* Category */}
        <label htmlFor="category" className="font-medium text-gray-300 mb-1 block">
          Category
        </label>
        <select
          id="category"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="w-full mb-6 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="">Select Category</option>
          <option value="romantic">Romantic</option>
          <option value="thriller">Thriller</option>
          <option value="comedy">Comedy</option>
          <option value="inspiring">Inspiring</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
}
