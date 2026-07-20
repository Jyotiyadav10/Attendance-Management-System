"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login({
        email,
        password,
      });
const user = JSON.parse(localStorage.getItem("user") || "{}");

switch (user.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;

        case "teacher":
          router.push("/teacher/dashboard");
          break;

        case "student":
          router.push("/student/dashboard");
          break;

        default:
          router.push("/");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white w-[400px] p-8 rounded-2xl shadow-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Attendance System
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded-lg mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}