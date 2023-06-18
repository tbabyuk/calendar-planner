// import styles
import "./TaskModal.css"

import { doc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config";


function AddTaskModal({currentDate, numberOfCurrentTasks, month, day, closeAddTaskModal, notifySuccess, notifyError}) {

  const inputRef = useRef()
  const [newTask, setNewTask] = useState("")
  // const [saveMessage, setSaveMessage] = useState("Save Task")


  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeAddTaskModal()
    }
  }

  // add task
  const handleSaveTask = async () => {
    const docRef = doc(db, "tasks", month);

    try {
      await updateDoc(docRef, {
        [`${day}.${numberOfCurrentTasks + 1}`]: newTask
      })
      notifySuccess("task successfully added!")

    } catch(err) {
      notifyError(err.message)
      console.log(err.message)
    }
    
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
        <button className="modal-btn" onClick={handleSaveTask}>Save Task</button>
      </div>
    </div>
  )
}

export default AddTaskModal