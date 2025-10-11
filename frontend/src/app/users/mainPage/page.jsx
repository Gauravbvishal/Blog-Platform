"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function MainPage() {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [blogDate, setDate] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
    const router = useRouter();
  async function formSubmit(e) {
    try{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/blog', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,authorName,blogDate,content,categories})
    });
    await response.json();
    setTitle('');
    setAuthorName('');
    setContent('');
    setCategories('');
    setDate('');
    router.push('/users/blogs');
  }
  catch(err){
    console.error(err)
  }
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200" onSubmit={formSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create a New Blog
        </h2>

        {/* Title */}
        <label htmlFor="title" className="font-medium text-gray-600 mb-1 block">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Author Name */}
        <label htmlFor="author" className="font-medium text-gray-600 mb-1 block">
          Author Name
        </label>
        <input
          type="text"
          id="author"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author name"
          className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Date */}
        <label htmlFor="date" className="font-medium text-gray-600 mb-1 block">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={blogDate}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Content */}
        <label htmlFor="content" className="font-medium text-gray-600 mb-1 block">
          Content
        </label>
        <textarea
          id="content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        ></textarea>

        {/* Categories */}
        <label htmlFor="category" className="font-medium text-gray-600 mb-1 block">
          Category
        </label>
        <select
          id="category"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="w-full mb-6 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="romantic">Romantic</option>
          <option value="thriller">Thriller</option>
          <option value="comedy">Comedy</option>
          <option value="inspiring">Inspiring</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
}
