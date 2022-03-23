import { useState } from "react"


export function Task({ setTasksList, tasksList, updateTasks }) {

  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const newTaskList = tasksList.concat({ label: newTask, done: false });
    setTasksList(newTaskList)
    updateTasks();
    setNewTask('');
  }

  return (
    <>
      <form action="" onSubmit={addTask}>
        <input
          type="text"
          placeholder="ingresa una tarea"
          onChange={(event) => setNewTask(event.target.value)}
          value={newTask}
        />
      </form>

    </>
  )
}