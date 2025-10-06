"use client";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample blog data (replace with API data)
  const blogs = [
    {
      id: 1,
      title: "Mastering JavaScript ES6+ Features",
      author: "Vishal Gaurav",
      date: "Oct 5, 2025",
      image: "https://images.unsplash.com/photo-1581276879432-15a19d654956?auto=format&fit=crop&w=800&q=80",
      description:
        "Learn modern JavaScript concepts like destructuring, promises, async/await, and more in this complete ES6+ guide.",
    },
    {
      id: 2,
      title: "Building a REST API with Spring Boot",
      author: "John Doe",
      date: "Sep 28, 2025",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      description:
        "This tutorial walks through creating a powerful and secure REST API using Spring Boot and MySQL.",
    },
    {
      id: 3,
      title: "Top 10 Tips to Write Clean React Code",
      author: "Jane Smith",
      date: "Sep 21, 2025",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      description:
        "Writing maintainable React code is an art. Here are 10 best practices to keep your components clean and efficient.",
    },
  ];

  // Filter blogs by search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyBlog</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to My Blog</h2>
        <p className="text-lg mb-6">Insights, tutorials, and stories on coding and technology.</p>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg text-gray-800 focus:outline-none"
        />
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h3 className="text-2xl font-semibold mb-4">🌟 Featured Article</h3>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <h4 className="text-2xl font-bold mb-2">{blogs[0].title}</h4>
            <p className="text-gray-600 mb-4">{blogs[0].description}</p>
            <div className="text-sm text-gray-500">
              By {blogs[0].author} • {blogs[0].date}
            </div>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-6xl mx-auto px-4 mt-14 mb-10">
        <h3 className="text-2xl font-semibold mb-6">📰 Latest Posts</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h4 className="text-lg font-bold mb-2 hover:text-blue-600 cursor-pointer">
                  {blog.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {blog.description}
                </p>
                <div className="text-xs text-gray-500">
                  By {blog.author} • {blog.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} MyBlog. Built with ❤️ by Vishal Gaurav.</p>
      </footer>
    </div>
  );
}
