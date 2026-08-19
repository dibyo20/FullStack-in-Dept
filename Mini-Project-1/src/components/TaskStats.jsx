import { useSelector } from "react-redux";

const TaskStats = () => {
  const tasks = useSelector((state) => state.task.task);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.filter((task) => !task.completed).length;

  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center sm:items-start">
          <span className="text-xs font-medium text-gray-500">Total</span>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 mt-0.5">
            {total}
          </span>
        </div>

        <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex flex-col items-center sm:items-start">
          <span className="text-xs font-medium text-amber-700">Pending</span>
          <span className="text-xl sm:text-2xl font-bold text-amber-700 mt-0.5">
            {pending}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col items-center sm:items-start">
          <span className="text-xs font-medium text-emerald-700">
            Completed
          </span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5">
            {completed}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Progress</span>
          <span className="font-semibold text-gray-700">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
