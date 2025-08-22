import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const TaskCard = ({ task, setTasks }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // prevent link navigation

    try {
      if (!window.confirm("Are you sure you want to delete this task?")) return;

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete task: ${res.status}`);
      }

      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleToggleStatus = async (e, id) => {
    e.stopPropagation(); // prevent link navigation
    const newStatus = !task.completed;

    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ completed: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: newStatus } : t))
      );

      toast.success(
        `Task marked as ${newStatus ? "Completed ✅" : "Pending ⏳"}`
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-neutral-800 rounded-2xl p-6 relative border-t-4 border-green-500 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2
          className={`text-xl font-semibold ${
            task.completed ? "line-through text-gray-400" : "text-gray-200"
          }`}
        >
          {task.title}
        </h2>

        {/* Status Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onClick={(e) => {
              e.preventDefault(); // stop Link navigation
              e.stopPropagation(); // stop bubbling
            }}
            onChange={(e) => handleToggleStatus(e, task._id)}
            className="checkbox checkbox-sm checkbox-success"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4">{task.description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{task.createdAt}</span>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="text-gray-300 hover:text-gray-100 transition-colors">
            <Link to={`/task/${task._id}`}>
              <Pencil size={18} />
            </Link>
          </button>
          <button
            className="text-red-500 hover:text-red-700 transition-colors"
            onClick={(e) => handleDelete(e, task._id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
