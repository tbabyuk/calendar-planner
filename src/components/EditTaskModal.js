// import styles
import styles from "./TaskModal.css"

import { doc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config";

function EditTaskModal({currentDate, currentTask, taskKey, month, day, closeEditTaskModal, notifySuccess, notifyError}) {

  const inputRef = useRef()
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [newTask, setNewTask] = useState(currentTask)


  const toggleEdit = () => {
    setIsBeingEdited(true)
  }

  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeEditTaskModal()
    }
  }

  const handleSaveTask = async () => {

    const docRef = doc(db, "tasks", month);

    try {
      await updateDoc(docRef, {
        [`${day}.${taskKey}`]: newTask
      })
      notifySuccess("task successfully updated!")

    } catch(err) {
      notifyError(err.message)
      console.log(err.message)
    }
    
    setTimeout(() => {
      closeEditTaskModal()
      setIsBeingEdited(false)
    }, 500)
  }

  useEffect(() => {
    inputRef.current.selectionStart = currentTask.length;
    inputRef.current.selectionEnd = currentTask.length;
    inputRef.current.focus()
  }, [isBeingEdited])
 

  return (
    <div className="day-modal-overlay" id="day-modal" onClick={(e) => handleCloseModal(e)}>
      <div className="day-modal-container">
        <button className="modal-btn" onClick={toggleEdit}>Edit Task</button>
        <small className="text-center">Editing task for <strong>{currentDate}</strong></small>
        <textarea type="text" value={isBeingEdited ? newTask : currentTask} onChange={e => setNewTask(e.target.value)} disabled={!isBeingEdited} ref={inputRef} />
        <button className="modal-btn" disabled={!isBeingEdited} onClick={handleSaveTask}>Save Task</button>
      </div>
    </div>
  )
}

export default EditTaskModal