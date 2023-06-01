// styles
import "./Calendar.css"

// day picker imports
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from "date-fns/format";

import { useState } from "react";


export const Calendar = () => {
    const [selected, setSelected] = useState();

    const handleSelectedDate = (day) => {
        setSelected(day)
    }

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, 'PP')}.</p>;
    }


  return (
    <div className="container calendar-page mt-5"> 
        <div className="row">
            <div className="calendar-container col d-flex justify-content-center">
                <DayPicker
                      mode="single"
                      selected={selected}
                    //   onSelect={setSelected}
                      onDayClick={handleSelectedDate}
                />
            </div>
            <div className="tasks-container col p-4">
                <p className="text-center">{footer}</p>
            </div>
        </div>
    </div>
  )
}