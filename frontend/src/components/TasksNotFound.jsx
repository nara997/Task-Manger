import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const TasksNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center">
      {/* Icon */}
      <div className="bg-green-500/10 rounded-full p-8">
        <NotebookIcon className="h-16 w-16 text-green-500" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-white">No Tasks Yet</h3>

      {/* Description */}
      <p className="text-gray-400">
        Looks like your task manager is empty. Start creating tasks to organize
        your ideas and stay productive!
      </p>

      {/* Action Button */}
      <Link
        to="/create"
        className="px-6 py-3 bg-green-600 text-black font-semibold rounded-3xl hover:bg-green-700 transition-colors"
      >
        Create Your First Task
      </Link>
    </div>
  );
};

export default TasksNotFound;
