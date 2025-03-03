import ModalRoot from "../components/Modal/ModalRoot";
import TasksLayout from "../components/Tasks/TasksLayout";

export default function App() {
  return (
    <div className="max-w-7xl m-auto min-h-screen p-4">
      <div className="grid grid-cols-2 gap-10">
        <TasksLayout />
        
      </div>

      <ModalRoot />
    </div>
  );
}
