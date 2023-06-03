// import styles
import "./TaskModal.css"

import { doc, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react"
import { db } from "../../firebase/config";


function AddTaskModal({currentDate, month, day, closeAddTaskModal, numberOfCurrentTasks}) {

  const inputRef = useRef()
  const [newTask, setNewTask] = useState("")
  const [saveMessage, setSaveMessage] = useState("Save Task")


  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeAddTaskModal()
    }
  }

  const handleSaveTask = async () => {

    const docRef = doc(db, "tasks", month);

    try {
      await updateDoc(docRef, {
        [`${day}.${numberOfCurrentTasks + 1}`]: newTask  
      })

    } catch(err) {
      console.log(err.message)
    }
    
    setSaveMessage("New Task Saved!")

    setTimeout(() => {
      closeAddTaskModal()
    }, 1000)

  }
 

  return (
    <div className="day-modal-overlay" id="day-modal" onClick={(e) => handleCloseModal(e)}>
      <div className="day-modal-container">
        <small className="text-center">Adding task for <strong>{currentDate}</strong></small>
        <textarea type="text" value={newTask} onChange={e => setNewTask(e.target.value)} ref={inputRef} />
        <button className="modal-btn" onClick={handleSaveTask}>{saveMessage}</button>
      </div>
    </div>
  )
}

export default AddTaskModal