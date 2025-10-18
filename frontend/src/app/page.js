"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const[data,setData]=useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function loginPage(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // clear old messages

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data1 = await response.json();
      // console.log("Response:", data1);
      // Store JWT
      localStorage.setItem("jwt",JSON.stringify(data1));
      const datas=localStorage.getItem("jwt")
      console.log(datas)
       
      if (data1.success) {
        setEmail("");
        setPassword("");
        setMessage(data1.message || "Login successful!");
        router.push(`/users/mainPage/${data1.data.userId}`);
      } else {
        setMessage(data1.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:w-full h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {message && (
              <p
                className={`text-sm font-medium ${message.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {message}
              </p>
            )}
 
            <form className="space-y-4" onSubmit={loginPage}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full border text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
