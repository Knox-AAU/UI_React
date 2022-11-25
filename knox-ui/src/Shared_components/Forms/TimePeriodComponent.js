import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Stack} from "@mui/material";
import DatePicker from "../CustomDatePicker";
import React from "react";

export function TimePeriodComponent({header, beforeDate, setBeforeDate, afterDate, setAfterDate}) {

    return (
        <div className='sidebar-component'>
            <h5 className="mb-3">{header}</h5>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker label="From" date={afterDate} setDate={setAfterDate}/>
                        <DatePicker label="To" date={beforeDate} setDate={setBeforeDate}/>
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}