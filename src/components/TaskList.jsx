import { useEffect, useState } from "react";
import { Task } from "./Task";

export function TaskList() {

  const [tasksList, setTasksList] = useState([])

  const URL = "https://assets.breatheco.de/apis/fake/todos/user/jarrod"

  const toGetTasksFromApi = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setTasksList(data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    toGetTasksFromApi()
  }, []);

  const updateTasks = () => {
    fetch(URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tasksList)
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }
  // toGetTasksFromApi()

  const deleteTask = (index) => {
    const filteredTasksList = tasksList.filter((task, id) => (id !== index))
    setTasksList(filteredTasksList);
    // console.log("eliminando elemento " + index)
    console.log(tasksList)
    updateTasks();
  }

  const clearTasksList = () => {
    fetch(URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        "label": "tarea de ejemplo puede eliminar",
        "done": false
      }])
    })

      .then(() => toGetTasksFromApi())
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))



  }

  return (
    <>
      <Task setTasksList={setTasksList} tasksList={tasksList} updateTasks={updateTasks} />
      <div className="list-container">
        <ul>
          {tasksList.map((tasks, index) =>
            <li key={index} className="task-container" >
              {tasks.label}
              <span
                style={{ cursor: 'pointer' }} onClick={() => deleteTask(index)}
              >  X </span>
            </li>
          )}
        </ul>
        <div>
          <p>{tasksList.length} items left</p>
          <button
            type="button"
            onClick={() => clearTasksList()}

          >Clear List</button>
        </div>
      </div>

    </>
  )
}
