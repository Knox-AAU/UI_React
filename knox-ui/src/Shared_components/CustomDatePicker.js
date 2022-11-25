import React from "react";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

function CustomDatePicker({label, date, setDate}) {
    const handleChange = (newValue) => setDate(newValue);

    return (
        <div>
            <DesktopDatePicker
                views={['year', 'month', 'day']}
                inputFormat='DD/MM/YYYY'
                maxDate={new dayjs()}
                onChange={(change) => handleChange(change)}
                label={label}
                value={date}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ffffff'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ffffff'
                                },
                            },
                        }}
                    />
                }
            />
        </div>
    );
}

export default CustomDatePicker;
