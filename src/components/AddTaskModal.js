// import styles
import "./TaskModal.css"

import { useState, useEffect, useRef } from "react"
import { useFirestore } from "../hooks/useFirestore";


function AddTaskModal({currentDate, numberOfCurrentTasks, month, day, closeAddTaskModal}) {

  const inputRef = useRef()
  const [newTask, setNewTask] = useState("")
  const {handleAddTask} = useFirestore()

  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeAddTaskModal()
    }
  }

  // add a new task
  const handleAdd = () => {
    handleAddTask(numberOfCurrentTasks, month, day, newTask)
    setTimeout(() => {
      closeAddTaskModal()
    }, 500)
  }

  // set cursor to beginning of text field when component renders
  useEffect(() => {
    inputRef.current.focus()
  }, [])
 

  return (
    <div className="day-modal-overlay" id="day-modal" onClick={(e) => handleCloseModal(e)}>
      <div className="day-modal-container">
        <small className="text-center">Adding task for <strong>{currentDate}</strong></small>
        <textarea type="text" value={newTask} onChange={e => setNewTask(e.target.value)} ref={inputRef} />
        <button className="modal-btn" onClick={handleAdd}>Save Task</button>
      </div>
    </div>
  )
}

export default AddTaskModal