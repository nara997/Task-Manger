import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { toast } from "react-hot-toast";
import TasksNotFound from "../components/TasksNotFound";
import { API_URL } from "../config";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          // Throw a proper Error instance
          throw new Error(data.error || "Failed to fetch tasks");
        }

        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        toast.error(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <Navbar />

      {loading ? (
        <p className="text-gray-400 text-center mt-20">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <main className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} setTasks={setTasks} />
          ))}
        </main>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <TasksNotFound />
        </div>
      )}
    </div>
  );
};

export default HomePage;
