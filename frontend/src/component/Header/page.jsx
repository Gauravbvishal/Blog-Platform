import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Headers() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 shadow-lg">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/image.jpg"
          height={50}
          width={50}
          alt="Logo"
          className="rounded-full"
        />
        <span className="text-white font-bold text-lg">My Blog</span>
      </div>

      <nav className="relative">
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/users/mainPage/"
              className="text-gray-300 hover:text-white transition"
            >
              Create Blog
            </Link>
          </li>
          <li>
            <Link
              href="/users/blogs"
              className="text-gray-300 hover:text-white transition"
            >
              All Blogs
            </Link>
          </li>
          <li className="relative">
            <button onClick={() => setOpen(!open)} className="text-gray-300 hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                <Link
                  href="/favourites"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  User details
                </Link>
                <Link
                  href="/favourites"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Favourite Blogs
                </Link>
                  <Link
                  href="/favourites"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Liked Blogs
                </Link>
                  <Link
                  href="/favourites"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Disliked Blogs
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Logout
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
