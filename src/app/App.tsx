import DailyProgress from "../components/DailyProgress";
import TaskComponent from "../components/Tasks/TaskComponent";

export default function App() {
  return (
    <div className="max-w-7xl m-auto font-bold min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-20 w-full">
        <div className="">
            <TaskComponent/>
        </div>
        <div>
            <DailyProgress/>
        </div>
      </div>
    </div>
  );
}
