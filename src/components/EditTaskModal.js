// import styles
import "./TaskModal.css"

import { useState, useEffect, useRef } from "react"
import { useFirestore } from "../hooks/useFirestore"


function EditTaskModal({currentDate, currentTask, taskKey, month, day, closeEditTaskModal}) {

  const inputRef = useRef()
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [newTask, setNewTask] = useState(currentTask)
  const {handleEditTask} = useFirestore()

  const toggleEdit = () => {
    setIsBeingEdited(true)
  }

  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeEditTaskModal()
    }
  }

  // edit existing task
  const handleEdit = async () => {
    handleEditTask(month, day, taskKey, newTask)    
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
        <button className="modal-btn" disabled={!isBeingEdited} onClick={handleEdit}>Save Task</button>
      </div>
    </div>
  )
}

export default EditTaskModal