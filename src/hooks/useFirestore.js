
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase/config";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const notifyError = (msg) => {
    toast.error(msg)
  }
  
  const notifySuccess = (msg) => {
    toast.success(msg)
  }

  
export const useFirestore = () => {


    // ADD NEW TASK
    const handleAddTask = async (numberOfCurrentTasks, month, day, newTask) => {
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
    }


    // DELETE EXISTING TASK
    const handleDeleteTask = async (selectedDateDetails, index) => {
      const docRef = doc(db, "tasks", selectedDateDetails.selectedMonth);
      try {
          await updateDoc(docRef, {
            [`${selectedDateDetails.selectedDay}.${index + 1}`]: deleteField() 
          })
          notifySuccess("task successfully deleted!")
      } catch(err) {
          notifyError(err.message)
          console.log(err.message)
        }    
    }


    // EDIT EXISTING TASK
    const handleEditTask = async (month, day, taskKey, newTask) => {
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
    }

  return {handleAddTask, handleDeleteTask, handleEditTask}

}