// styles
import "./Calendar.css"

// day picker imports
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from "date-fns/format";

// modals imports
import EditTaskModal from "../components/EditTaskModal";
import AddTaskModal from "../components/AddTaskModal";

// firebase imports
import { doc, collection, updateDoc, deleteField, onSnapshot } from "firebase/firestore";

// other imports
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const colRef = collection(db, "tasks");


export const Calendar = () => {

    const [selectedDate, setSelectedDate] = useState();
    const [selectedDateDetails, setSelectedDateDetails] = useState({})
    const [bookedDays, setBookedDays] = useState([])
    const [currentTasks, setCurrentTasks] = useState([])
    const [targetId, setTargetId] = useState("")
    const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false)
    const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)


    // tasks by month
    const [januaryDays, setJanuaryDays] = useState({})
    const [februaryDays, setFebruaryDays] = useState({})
    const [marchDays, setMarchDays] = useState({})
    const [aprilDays, setAprilDays] = useState({})
    const [mayDays, setMayDays] = useState({})
    const [juneDays, setJuneDays] = useState({})
    const [julyDays, setJulyDays] = useState({})
    const [augustDays, setAugustDays] = useState({})
    const [septemberDays, setSeptemberDays] = useState({})
    const [octoberDays, setOctoberDays] = useState({})
    const [novemberDays, setNovemberDays] = useState({})
    const [decemberDays, setDecemberDays] = useState({})


    const notifyError = (msg) => {
      toast.error(msg)
    }

    const notifySuccess = (msg) => {
      toast.success(msg)
    }

    const handleOnline = () => {
      notifySuccess("You're back online!")
    }

    const handleOffline = () => {
      notifyError("Your internet appears to be offline, please check connection!")
    }


    // display selected date
    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
      footer = <p>You picked {selectedDate}.</p>;
    }

    const bookedStyle = {border: "2px solid orange", background: "blue"}
    const selectedStyle = {background: "orange"}

    const closeEditTaskModal = () => {
      setEditTaskModalIsOpen(false)
    }

    const closeAddTaskModal = () => {
      setAddTaskModalIsOpen(false)
    }

    const handleAdd = () => {
      setAddTaskModalIsOpen(true)
    }

    const handleEdit = (index) => {
      setTargetId(index)
      setEditTaskModalIsOpen(true)
    }

    // delete task
    const handleDelete = async (index) => {
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


    const handleSelectedDate = (day) => {

      const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      setSelectedDate(format(day, "PP"))
      setSelectedDateDetails({
        selectedDay: day.getDate(),
        selectedMonth: monthArray[day.getMonth()].toLowerCase(),
        selectedYear: day.getYear()
      })

    }


    // check user's internet connection
    useEffect(() => {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);


    // STEP 1: on initial render and on every change to the collection thereafter, get all docs for each month and update the corresponding state

    useEffect(() => {

      const unsubscribe = onSnapshot(colRef, snapshot => {

        snapshot.forEach(doc => {

          switch(doc.id) {
            case "january":
              setJanuaryDays(doc.data())
            break;
            case "february":
              setFebruaryDays(doc.data())
            break;
            case "march":
              setMarchDays(doc.data())
            break;
            case "april":
              setAprilDays(doc.data())
            break;
            case "may":
              setMayDays(doc.data())
            break;
            case "june":
              setJuneDays(doc.data())
            break;
            case "july":
              setJulyDays(doc.data())
            break;
            case "august":
              setAugustDays(doc.data())
            break;
            case "september":
              setSeptemberDays(doc.data())
            break;
            case "october":
              setOctoberDays(doc.data())
            break;
            case "november":
              setNovemberDays(doc.data())
            break;
            case "december":
              setDecemberDays(doc.data())
            break;

            default:
            break;
          }
        })
      })
          return () => {
            unsubscribe();
          };
                
    }, [])



    // STEP 2: once firestore data is populated to the state, filter all days for each month to figure out which days have tasks assigned to them, and put all these days into an array, which is to be used to visually highlight these days in the calendar

    useEffect(() => {
  
      // get January days with tasks
      const januaryDaysWithTasks = [];
      const januaryKeys = Object.keys(januaryDays)
      januaryKeys.forEach((key) => {
        if(januaryDays[key][1]) {
          januaryDaysWithTasks.push(new Date(`2023, 1, ${key}`))
        }
      })

      // get February days with tasks
      const februaryDaysWithTasks = [];
      const februaryKeys = Object.keys(februaryDays)
      februaryKeys.forEach((key) => {
        if(februaryDays[key][1]) {
          februaryDaysWithTasks.push(new Date(`2023, 2, ${key}`))
        }
      })
      
      // get March days with tasks
      const marchDaysWithTasks = [];
      const marchKeys = Object.keys(marchDays)
      marchKeys.forEach((key) => {
        if(marchDays[key][1]) {
          marchDaysWithTasks.push(new Date(`2023, 3, ${key}`))
        }
      })

      // get April days with tasks
      const aprilDaysWithTasks = [];
      const aprilKeys = Object.keys(aprilDays)
      aprilKeys.forEach((key) => {
        if(aprilDays[key][1]) {
          aprilDaysWithTasks.push(new Date(`2023, 4, ${key}`))
        }
      })

      // get May days with tasks
      const mayDaysWithTasks = [];
      const mayKeys = Object.keys(mayDays)
      mayKeys.forEach((key) => {
        if(mayDays[key][1]) {
          mayDaysWithTasks.push(new Date(`2023, 5, ${key}`))
        }
      })

      // get June days with tasks
      const juneDaysWithTasks = [];
      const juneKeys = Object.keys(juneDays)
      juneKeys.forEach((key) => {
        if(juneDays[key][1]) {
          juneDaysWithTasks.push(new Date(`2023, 6, ${key}`))
        }
      })
  
      // get July days with tasks
      const julyDaysWithTasks = [];
      const julyKeys = Object.keys(julyDays)
      julyKeys.forEach((key) => {
        if(julyDays[key][1]) {
          julyDaysWithTasks.push(new Date(`2023, 7, ${key}`))
        }
      })
  
      // get August days with tasks
      const augustDaysWithTasks = [];
      const augustKeys = Object.keys(augustDays)
      augustKeys.forEach((key) => {
        if(augustDays[key][1]) {
          augustDaysWithTasks.push(new Date(`2023, 8, ${key}`))
        }
      })
  
      // get September days with tasks
      const septemberDaysWithTasks = [];
      const septemberKeys = Object.keys(septemberDays)
      septemberKeys.forEach((key) => {
        if(septemberDays[key][1]) {
          septemberDaysWithTasks.push(new Date(`2023, 9, ${key}`))
        }
      })
  
      // get October days with tasks
      const octoberDaysWithTasks = [];
      const octoberKeys = Object.keys(octoberDays)
      octoberKeys.forEach((key) => {
        if(octoberDays[key][1]) {
          octoberDaysWithTasks.push(new Date(`2023, 10, ${key}`))
        }
      })
  
      // get November days with tasks
      const novemberDaysWithTasks = [];
      const novemberKeys = Object.keys(novemberDays)
      novemberKeys.forEach((key) => {
        if(novemberDays[key][1]) {
          novemberDaysWithTasks.push(new Date(`2023, 11, ${key}`))
        }
      })
  
      // get December days with tasks
      const decemberDaysWithTasks = [];
      const decemberKeys = Object.keys(decemberDays)
      decemberKeys.forEach((key) => {
        if(decemberDays[key][1]) {
          decemberDaysWithTasks.push(new Date(`2023, 12, ${key}`))
        }
      })
  
  
      setBookedDays([...januaryDaysWithTasks, ...februaryDaysWithTasks, ...marchDaysWithTasks, ...aprilDaysWithTasks, ...mayDaysWithTasks, ...juneDaysWithTasks, ...julyDaysWithTasks, ...augustDaysWithTasks, ...septemberDaysWithTasks, ...octoberDaysWithTasks, ...novemberDaysWithTasks, ...decemberDaysWithTasks])
    
    }, [januaryDays])
    


    // STEP 3: depending on which day of a month the user selects, pull up all the tasks for that particular day and put them into an array, which will be mapped through in the UI

    useEffect(() => {

      switch(selectedDateDetails.selectedMonth) {
        case "january":
          const januaryDayTasksArray = Object.values(januaryDays[selectedDateDetails.selectedDay])
          setCurrentTasks(januaryDayTasksArray)
        break;
        case "february":
          const februaryDayTasksArray = Object.values(februaryDays[selectedDateDetails.selectedDay])
          setCurrentTasks(februaryDayTasksArray)
        break;
        case "march":
          const marchDayTasksArray = Object.values(marchDays[selectedDateDetails.selectedDay])
          setCurrentTasks(marchDayTasksArray)
        break;
        case "april":
          const aprilDayTasksArray = Object.values(aprilDays[selectedDateDetails.selectedDay])
          setCurrentTasks(aprilDayTasksArray)
        break;
        case "may":
          const mayDayTasksArray = Object.values(mayDays[selectedDateDetails.selectedDay])
          setCurrentTasks(mayDayTasksArray)
        break;
        case "june":
          const juneDayTasksArray = Object.values(juneDays[selectedDateDetails.selectedDay])
          setCurrentTasks(juneDayTasksArray)
        break;
        case "july":
          const julyDayTasksArray = Object.values(julyDays[selectedDateDetails.selectedDay])
          setCurrentTasks(julyDayTasksArray)
        break;
        case "august":
          const augustDayTasksArray = Object.values(augustDays[selectedDateDetails.selectedDay])
          setCurrentTasks(augustDayTasksArray)        
          break;
        case "september":
          const septemberDayTasksArray = Object.values(septemberDays[selectedDateDetails.selectedDay])
          setCurrentTasks(septemberDayTasksArray)        
          break;
        case "october":
          const octoberDayTasksArray = Object.values(octoberDays[selectedDateDetails.selectedDay])
          setCurrentTasks(octoberDayTasksArray)        
          break;
        case "november":
          const novemberDayTasksArray = Object.values(novemberDays[selectedDateDetails.selectedDay])
          setCurrentTasks(novemberDayTasksArray)        
          break;
        case "december":
          const decemberDayTasksArray = Object.values(decemberDays[selectedDateDetails.selectedDay])
          setCurrentTasks(decemberDayTasksArray)        
          break;
        default:
        break;
      }

    }, [selectedDate, januaryDays])



  return (
    <div className="container calendar-page">

        <div className="row">

            {/* calendar container */}
            <div className="calendar-container col-12 col-md-6 d-flex justify-content-center">
                <DayPicker
                      mode="single"
                      selected={selectedDate}
                      modifiers={{booked: bookedDays}}
                      modifiersStyles={{booked: bookedStyle, selected: selectedStyle}}
                      onDayClick={handleSelectedDate}
                      fromYear={2023}
                      toYear={2023}
                />
            </div>

            {/* tasks container */}
            <div className="tasks-container col-12 col-md-6 px-4 pt-5 pt-md-0">
                <div className="tasks-header d-flex flex-column flex-xl-row justify-content-evenly align-items-center pb-4 mb-4">
                    <div className="selected-message">{footer}</div>
                    <button className="add-task-btn" disabled={!selectedDate} onClick={handleAdd}>Add new task for this day</button>
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        // newestOnTop={false}
                        // closeOnClick
                        // rtl={false}
                        // pauseOnFocusLoss
                        // draggable
                        // pauseOnHover
                        // theme="light"
                    />                    
                </div>
                <div className="tasks-list">

                    {currentTasks[0]?.length ? (
            
                    currentTasks.map((task, index) => (
                    <li key={index} className="task">
                        <span>{task}</span>
                        <span className="d-flex justify-content-between align-items-center"><i className="far fa-edit edit" onClick={() => handleEdit(index)}></i><i className="far fa-trash-alt delete ms-2" onClick={() => handleDelete(index)}></i></span>
                    </li>
                    ))
                    ) : ("no tasks to show for this day")}
                  </div>

            </div>

        </div>


        {editTaskModalIsOpen &&
          <EditTaskModal currentDate={selectedDate} currentTask={currentTasks[targetId]} taskKey={targetId + 1} month={selectedDateDetails.selectedMonth} day={selectedDateDetails.selectedDay} closeEditTaskModal={closeEditTaskModal} notifySuccess={notifySuccess} notifyError={notifyError}
          />
        }

        {addTaskModalIsOpen && 
          <AddTaskModal currentDate={selectedDate} numberOfCurrentTasks={currentTasks[0]?.length ? currentTasks.length : 0} month={selectedDateDetails.selectedMonth} day={selectedDateDetails.selectedDay} closeAddTaskModal={closeAddTaskModal} notifySuccess={notifySuccess} notifyError={notifyError} />
        }

    </div>
  )
}