import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import DatePicker from "../CustomDatePicker";
import React from "react";

export function TimePeriodComponent({header, beforeDate, setBeforeDate, afterDate, setAfterDate}) {

    return (
        <div className='sidebar-section'>
            <h5 className="mb-3">{header}</h5>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className='sidebar-component' label="From" date={afterDate} setDate={setAfterDate}/>
                    <DatePicker className='sidebar-component' label="To" date={beforeDate} setDate={setBeforeDate}/>
                </LocalizationProvider>
            </div>
        </div>
    );
}