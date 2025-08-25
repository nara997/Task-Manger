import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ basic client-side validation
    if (username.trim().length < 6) {
      toast.error("Username must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    // ✅ new password rule: at least one uppercase & one special character
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*/.test(password)) {
      toast.error(
        "Password must include at least one uppercase letter and one special character"
      );
      setLoading(false);
      return;
    }

    try {
      await signup(username.trim(), email.trim(), password);
      toast.success("Account created successfully!");
      navigate("/tasks");
    } catch (err) {
      console.error("Login error", err);
      toast.error(
        err?.message || "Signup failed. Try again with different details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-500 text-center mb-6">
          Sign Up
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 mb-2">
            Username
          </label>
          <input
            autoFocus
            id="username"
            type="text"
            className="w-full p-3 rounded-lg bg-neutral-700 text-white focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-lg bg-neutral-700 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded-lg bg-neutral-700 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-black font-semibold py-3 rounded-3xl transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Switch to login */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
