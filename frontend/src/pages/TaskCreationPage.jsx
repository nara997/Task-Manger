import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast"; // ✅ import toast

const API_URL = "http://localhost:5000"; // or use import.meta.env.VITE_API_URL

const TaskCreationPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required!");
      console.log("Title and content are required!");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send cookie (auth)
        body: JSON.stringify({
          title: title.trim(),
          description: content.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create task. Try again.");
      }

      toast.success("Task created successfully!");
      navigate("/"); // ✅ go back to home page
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error(err.message || "Error creating task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-200 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Tasks
            </Link>
          </div>

          {/* Card */}
          <div className="bg-neutral-900 text-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>

            <form onSubmit={handleSubmit}>
              {/* Title input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task Title"
                  className="w-full rounded-lg border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Content textarea */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your task here..."
                  className="w-full h-32 rounded-lg border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-black hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationPage;
