import TaskTable from "./components/TaskTable";
import MainComponent from "./components/MainComponent";
import data from "./data";
import { useState } from "react";


function App() {

  const [data, setdata] = useState([])

  return (
    <div className="container mt-5">
      <MainComponent setdata={setdata}/>
      <TaskTable data={data} />
    </div>
  );
}

export default App;
