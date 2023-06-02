// import styles
import styles from "./TaskModal.css"

import { collection, onSnapshot, doc, getDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { useState, useEffect, useRef } from "react"
import { db } from "../../firebase/config";


function AddTaskModal({currentDate, closeAddTaskModal, currentTask, month, day, numberOfCurrentTasks}) {

  const inputRef = useRef()
  // const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [newTask, setNewTask] = useState(currentTask)
  const [saveMessage, setSaveMessage] = useState("Save Task")


  const handleCloseModal = (e) => {
    if(e.target.id === "day-modal") {
      closeAddTaskModal()
    }
  }

  const handleSaveTask = async (month, day) => {


    console.log("info:", month, day, numberOfCurrentTasks)

    const docRef = doc(db, "timeline", month);

    try {
      await updateDoc(docRef, {
        [`${day}.${numberOfCurrentTasks + 1}`]: newTask  
      })

    } catch(err) {
      console.log(err.message)
    }

    // updateDoc(docRef, {
    //   [day]: arrayUnion(task)
    // })
    // .then(() => console.log("doc updated"))
    
    setSaveMessage("New Task Saved!")
    setTimeout(() => {
      closeAddTaskModal()
    }, 2000)

  }
 



  return (
    <div className={styles["day-modal-overlay"]} id="day-modal" onClick={(e) => handleCloseModal(e)}>
      <div className={styles["day-modal-container"]}>
        <small className="text-center">Adding task for <strong>{currentDate}</strong></small>
        <textarea type="text" value={newTask} onChange={e => setNewTask(e.target.value)} ref={inputRef} />
        <button className={styles["modal-btn"]} onClick={() => handleSaveTask(month, day, newTask)}>{saveMessage}</button>
      </div>
    </div>
  )
}

export default AddTaskModal