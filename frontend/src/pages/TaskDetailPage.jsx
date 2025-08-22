import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch task");

        setTask({ title: data.title, description: data.description });
      } catch (err) {
        console.error("Error fetching task:", err);
        toast.error(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Save updated task
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save task");

      toast.success("Task updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error saving task:", err);
      toast.error(err.message || "Error saving task");
    } finally {
      setSaving(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete task");

      toast.success("Task deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error(err.message || "Error deleting task");
    }
  };

  if (loading) return <p className="text-gray-400 p-6">Loading task...</p>;

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Buttons */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-200 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Tasks
            </Link>

            <button
              onClick={handleDelete}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Task
            </button>
          </div>

          {/* Task Form */}
          <div className="bg-neutral-900 text-white rounded-2xl shadow-md p-6">
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Task title"
                disabled={saving}
                className="w-full rounded-lg border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Write your task here..."
                disabled={saving}
                className="w-full h-32 rounded-lg border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
