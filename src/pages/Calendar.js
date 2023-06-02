// styles
import "./Calendar.css"

// day picker imports
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from "date-fns/format";

import { useState, useEffect } from "react";
import { db } from "../firebase/config";

// firebase imports
import { getDocs, collection } from "firebase/firestore";

// import modals
import EditTaskModal from "../components/modals/EditTaskModal";
import AddTaskModal from "../components/modals/AddTaskModal";



const colRef = collection(db, "tasks");


export const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState();
    const [selectedDayDetails, setSelectedDayDetails] = useState({})
    const [bookedDays, setBookedDays] = useState([])
    const [currentTasks, setCurrentTasks] = useState([])
    const [targetId, setTargetId] = useState("")
    const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false)


    // tasks by month
    const [januaryTasks, setJanuaryTasks] = useState({})
    const [februaryTasks, setFebruaryTasks] = useState({})
    const [marchTasks, setMarchTasks] = useState({})
    const [aprilTasks, setAprilTasks] = useState({})
    const [mayTasks, setMayTasks] = useState({})
    const [juneTasks, setJuneTasks] = useState({})
    const [julyTasks, setJulyTasks] = useState({})
    const [augustTasks, setAugustTasks] = useState({})
    const [septemberTasks, setSeptemberTasks] = useState({})
    const [octoberTasks, setOctoberTasks] = useState({})
    const [novemberTasks, setNovemberTasks] = useState({})
    const [decemberTasks, setDecemberTasks] = useState({})

    //actual days that contain tasks by month
    const [januaryDaysWithContent, setJanuaryDaysWithContent] = useState([])   
    const [februaryDaysWithContent, setfebruaryDaysWithContent] = useState([])   
    const [marchDaysWithContent, setMarchDaysWithContent] = useState([])   
    const [aprilDaysWithContent, setAprilDaysWithContent] = useState([])   
    const [mayDaysWithContent, setMayDaysWithContent] = useState([])   
    const [juneDaysWithContent, setJuneDaysWithContent] = useState([])   
    const [julyDaysWithContent, setJulyDaysWithContent] = useState([])   
    const [augustDaysWithContent, setAugustDaysWithContent] = useState([])   
    const [septemberDaysWithContent, setSeptemberDaysWithContent] = useState([])   
    const [octoberDaysWithContent, setOctoberDaysWithContent] = useState([])   
    const [novemberDaysWithContent, setNovemberDaysWithContent] = useState([])   
    const [decemberDaysWithContent, setDecemberDaysWithContent] = useState([])

    const handleSelectedDate = (day) => {
        const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        console.log("logging currentDate", day)

        setSelectedDay(day)
        setSelectedDayDetails({
          selectedDay: day.getDate(),
          selectedMonth: monthArray[day.getMonth()].toLowerCase(),
          selectedYear: day.getYear()
        })

    }

    let footer = <p>Please pick a day.</p>;
    if (selectedDay) {
      footer = <p>You picked {format(selectedDay, 'PP')}.</p>;
    }

    const bookedStyle = {border: "2px solid orange"}
    const selectedStyle = {background: "orange"}


    const handleEdit = (index) => {
      console.log("you want to edit a task")
      setTargetId(index)
      setEditTaskModalIsOpen(true)
    }

    const closeEditTaskModal = () => {
      setEditTaskModalIsOpen(false)
    }

    const handleDelete = () => {
      console.log("you want to delete a task")
    }


    // STEP 1: on initial render, get document data for each month and update the corresponding state with data

    useEffect(() => {

    console.log("component has loaded", db)


    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          switch(doc.id) {
            case "june":
              setJuneTasks(doc.data())
            break;
            case "july":
              setJulyTasks(doc.data())
            break;
            case "august":
              setAugustTasks(doc.data())
            break;
            case "september":
              setSeptemberTasks(doc.data())
            break;
            case "october":
              setOctoberTasks(doc.data())
            break;
            case "november":
              setNovemberTasks(doc.data())
            break;
            case "december":
              setDecemberTasks(doc.data())
            break;

            default:
            break;
          }
        })
      })


  }, [])


    // STEP 2: once firestore data is populated to the state, filter all days for each month to figure out which days have tasks assigned to them, and put all these days into an array, which is to be used to visually highlight these days in the calendar

    useEffect(() => {
  
      // get June days with content
      const juneDaysWithTasks = [];
      const juneKeys = Object.keys(juneTasks)
      juneKeys.forEach((key) => {
        if(juneTasks[key][1]) {
          console.log(juneTasks[key][1])
          juneDaysWithTasks.push(new Date(`2023, 6, ${key}`))
        }
      })
  
      // get July days with content
      const julyDaysWithTasks = [];
      const julyKeys = Object.keys(julyTasks)
      julyKeys.forEach((key) => {
        if(julyTasks[key][1]) {
          julyDaysWithTasks.push(new Date(`2023, 7, ${key}`))
        }
      })
  
      // get August days with content
      const augustDaysWithTasks = [];
      const augustKeys = Object.keys(augustTasks)
      augustKeys.forEach((key) => {
        if(augustTasks[key][1]) {
          augustDaysWithTasks.push(new Date(`2023, 8, ${key}`))
        }
      })
  
      // get September days with content
      const septemberDaysWithTasks = [];
      const septemberKeys = Object.keys(septemberTasks)
      septemberKeys.forEach((key) => {
        if(septemberTasks[key][1]) {
          septemberDaysWithTasks.push(new Date(`2023, 9, ${key}`))
        }
      })
  
      // get October days with content
      const octoberDaysWithTasks = [];
      const octoberKeys = Object.keys(octoberTasks)
      octoberKeys.forEach((key) => {
        if(octoberTasks[key][1]) {
          octoberDaysWithTasks.push(new Date(`2023, 10, ${key}`))
        }
      })
  
      // get November days with content
      const novemberDaysWithTasks = [];
      const novemberKeys = Object.keys(novemberTasks)
      novemberKeys.forEach((key) => {
        if(novemberTasks[key][1]) {
          novemberDaysWithTasks.push(new Date(`2023, 11, ${key}`))
        }
      })
  
      // get December days with content
      const decemberDaysWithTasks = [];
      const decemberKeys = Object.keys(decemberTasks)
      decemberKeys.forEach((key) => {
        if(decemberTasks[key][1]) {
          decemberDaysWithTasks.push(new Date(`2023, 12, ${key}`))
        }
      })
  
  
      setBookedDays([...juneDaysWithTasks, ...julyDaysWithTasks, ...augustDaysWithTasks, ...septemberDaysWithTasks, ...octoberDaysWithTasks, ...novemberDaysWithTasks, ...decemberDaysWithTasks])
    
    }, [juneTasks])
    



    // STEP 3: depending on which day of a month the user selects, pull up all the tasks for that particular day and put them into an array, which will be mapped through in the UI

    useEffect(() => {
      
      switch(selectedDayDetails.selectedMonth) {
        case "june":
          const juneDayTasksArray = Object.values(juneTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(juneDayTasksArray)
        break;
        case "july":
          const julyDayTasksArray = Object.values(julyTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(julyDayTasksArray)
        break;
        case "august":
          const augustDayTasksArray = Object.values(augustTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(augustDayTasksArray)        
          break;
        case "september":
          const septemberDayTasksArray = Object.values(septemberTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(septemberDayTasksArray)        
          break;
        case "october":
          const octoberDayTasksArray = Object.values(octoberTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(octoberDayTasksArray)        
          break;
        case "november":
          const novemberDayTasksArray = Object.values(novemberTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(novemberDayTasksArray)        
          break;
        case "december":
          const decemberDayTasksArray = Object.values(decemberTasks[selectedDayDetails.selectedDay])
          setCurrentTasks(decemberDayTasksArray)        
          break;
        default:
        break;
      }

    }, [selectedDay])
  




  return (
    <div className="container calendar-page mt-5"> 
        <div className="row">
            <div className="calendar-container col d-flex justify-content-center py-5">
                <DayPicker
                      mode="single"
                      selected={selectedDay}
                      modifiers={{booked: bookedDays}}
                      modifiersStyles={{booked: bookedStyle, selected: selectedStyle}}
                      onDayClick={handleSelectedDate}
                      fromYear={2023}
                      toYear={2023}
                />
            </div>
            <div className="tasks-container col py-5 px-4">
            <div className="tasks-header">
            <div className="selected-message">{footer}</div>
              <button className="add-task-btn" disabled={!selectedDay}>Add a new task for this day</button>
            </div>
                {/* <p className="text-center">{footer}</p> */}

                {currentTasks[0]?.length ? (
        
                currentTasks.map((task, index) => (
                <li key={index} className="task">
                    <span>{task}</span>
                    <span className="d-flex justify-content-between align-items-center"><i className="far fa-edit edit" onClick={() => handleEdit(index)}></i><i className="far fa-trash-alt delete" onClick={handleDelete}></i></span>
                </li>
                ))
                ) : ("no tasks to show for this day")}

            </div>
        </div>


        {editTaskModalIsOpen &&
         <EditTaskModal closeEditTaskModal={closeEditTaskModal} currentTask={currentTasks[targetId]} currentTasks={currentTasks} day={selectedDayDetails.selectedDay} month={selectedDayDetails.selectedMonth}/>
        }

    </div>
  )
}