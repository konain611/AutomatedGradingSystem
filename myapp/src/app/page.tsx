"use client"

import { useState } from "react";

export default function Login() {
  const [userType, setUserType] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-black p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {userType === "student" ? "Student Portal" : "Faculty Login"}
        </h2>


        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setUserType("student")}
            className={`px-4 py-2 rounded-md transition ${
              userType === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserType("faculty")}
            className={`px-4 py-2 rounded-md transition ${
              userType === "faculty"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            Faculty
          </button>
        </div>


        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>


        <p className="text-sm text-center mt-4">
          Forgot your password?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}
