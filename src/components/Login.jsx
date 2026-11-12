
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { loginUser } from "../services/api";

function Login({ onLogin, onRegister }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(e.target);

    try {
      const res = await loginUser({
        username: form.get("username").trim(),
        password: form.get("password"),
      });

      const data = res.data?.data || res.data;

      const token =
        data.token ||
        data.accessToken ||
        data.access_token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      localStorage.setItem("token", token);

      onLogin();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={32} className="text-indigo-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            ChatApp
          </h1>

          <p className="text-gray-500 mt-2">
            Connect with your people
          </p>
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <h2 className="text-xl font-semibold">
            Welcome Back
          </h2>

          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            autoComplete="username"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-indigo-600 font-semibold"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
