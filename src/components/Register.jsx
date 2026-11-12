
import { useState } from "react";
import { MessageCircle, UserPlus } from "lucide-react";
import { createProfile } from "../services/api";

function Register({ onLogin, onBack }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(e.target);

    const userData = {
      fullName: form.get("fullName").trim(),
      username: form.get("username").trim(),
      password: form.get("password"),
      gender: form.get("gender"),
    };

    try {

      const res = await createProfile(userData);

      alert(
        res.data?.message ||
        "Registration successful! Please login."
      );

      onLogin();

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-6">

          <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle
              size={32}
              className="text-indigo-600"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join ChatApp today
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              required
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>

            <select
              name="gender"
              required
              defaultValue=""
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="" disabled>
                Select Gender
              </option>

              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Other">Other</option>

            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <UserPlus size={19} />

            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}

          <button
            type="button"
            onClick={onBack}
            className="text-indigo-600 font-semibold"
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;
