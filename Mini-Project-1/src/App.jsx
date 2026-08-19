import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskStats from "./components/TaskStats.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold text-gray-900 text-center sm:text-left">
            Task Manager
          </h1>
        </header>
        <TaskStats />
        <AddTask />
        <TaskList />
      </main>
    </div>
  );
};

export default App;
