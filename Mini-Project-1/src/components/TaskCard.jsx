import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../Features/taskSlice.js";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${
            task.completed
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        <h3
          className={`text-base font-medium truncate transition-colors ${
            task.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          onClick={() => dispatch(toggleTask(task.id))}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 ${
            task.completed
              ? "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300"
              : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:ring-emerald-500/20"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
