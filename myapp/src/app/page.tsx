"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const credentials = {
    student: { username: "student", password: "student123" },
    faculty: { username: "faculty", password: "faculty123" },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === credentials[userType].username &&
      password === credentials[userType].password
    ) {
      router.push(userType === "student" ? "/student-dashboard" : "/faculty-dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl font-semibold text-center mb-6 uppercase">
          {userType === "student" ? "Student Portal" : "Faculty Login"}
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setUserType("student")}
            className={`px-4 py-2 rounded transition-all duration-300 border border-black ${
              userType === "student"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserType("faculty")}
            className={`px-4 py-2 rounded transition-all duration-300 border border-black ${
              userType === "faculty"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Faculty
          </button>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded border border-black bg-white focus:border-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border border-black bg-white focus:border-black focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded transition-all duration-300 hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
