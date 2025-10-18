"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState("");
  const router = useRouter(); // ✅ initialize router

  // ✅ Fetch blogs (all or by category)
  async function allBlogs(selectedCategory = "") {
    try {
      const response = await fetch(
        `http://localhost:8000/blogshow?category=${selectedCategory}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  // ✅ Fetch all blogs when component loads
  useEffect(() => {
    allBlogs();
  }, []);

  // ✅ Handle category filter change
  function handleCategoryChange(e) {
    const selected = e.target.value;
    setCategories(selected);
    allBlogs(selected);
  }

  //Show More functionality
  function singleBlog(id) {
    router.push(`/users/showBlog/${id}`);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-10 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Explore Inspiring Blogs
        </h1>
        <p className="text-gray-400 text-lg">
          Discover stories, ideas, and insights from different categories.
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-5xl mx-auto mb-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          {["inspiring", "thriller", "romantic", "comedy"].map((cat) => (
            <label
              key={cat}
              htmlFor={cat}
              className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${categories === cat
                ? "bg-blue-700 border-blue-500 text-white"
                : "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-white"
                }`}
            >
              <input
                type="radio"
                id={cat}
                name="category"
                value={cat}
                checked={categories === cat}
                onChange={handleCategoryChange}
                className="hidden"
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}

          {/* All option */}
          <label
            htmlFor="all"
            className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${categories === ""
              ? "bg-blue-700 border-blue-500 text-white"
              : "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-white"
              }`}
          >
            <input
              type="radio"
              id="all"
              name="category"
              value=""
              checked={categories === ""}
              onChange={handleCategoryChange}
              className="hidden"
            />
            All
          </label>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-6xl mx-auto">
        {blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-500 transition-all duration-300 overflow-hidden"
              >
                {/* Optional Blog Header Image */}
                <div className="h-40 bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center">
                  <h2 className="text-2xl font-semibold text-white px-4 text-center">
                    {blog.title}
                  </h2>
                </div>

                <div className="p-5">
                  <p className="text-gray-400 text-sm mb-2">
                    By <span className="text-blue-400">{blog.authorName}</span>
                  </p>
                  <p className="text-gray-500 text-xs mb-3">
                    {new Date(blog.blogDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex wrap">
                    <span className="bg-blue-800 text-white p-1 rounded-full text-sm">
                      {blog.categories}
                    </span>
                    <button
                      type="button"
                      onClick={() => singleBlog(blog._id)}
                      className="ml-4 bg-blue-800 text-white p-1 rounded-full text-sm"
                    >
                      Show more
                    </button>
                    {/* Favourite Blog */}
                    <button type="" className="ml-3 rounded-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    {/* Like button */}
                    <button type="" className="ml-3 rounded-full text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.72l1.38-9a2 2 0 0 0-2-2.28H14z" />
                        <line x1="7" y1="22" x2="7" y2="11" />
                      </svg>
                    </button>
                    {/* dislike button */}
                    <button type="" className="ml-3 rounded-full text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-thumbs-down">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.72l-1.38 9a2 2 0 0 0 2 2.28H10z" />
                        <line x1="17" y1="2" x2="17" y2="13" />
                      </svg>
                    </button>
                    {/*Share button */}
                    <button type="button" className="rounded-full text-sm ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="M8.6 10.4L15.4 7.6" />
                        <path d="M8.6 13.6L15.4 16.4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No blogs found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
