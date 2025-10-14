import Link from 'next/link';
import Image from 'next/image';

export default function Headers() {
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

      <nav>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/users/mainPage"
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
          <li>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
