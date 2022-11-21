import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

function CustomDatePicker({label, options, setOptions, child}) {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        if (!isNaN(newValue) && label === "To") {
            setOptions(previousState => {
                return {...previousState, afterDate: newValue.toISOString()}
            });
        } else if (!isNaN(newValue) && label === "From") {
            setOptions(previousState => {
                return {...previousState, beforeDate: newValue.toISOString()}
            });
        }

        setValue(newValue);
    };

    return (
        <DatePicker
            views={['year', 'month', 'day']}
            inputFormat='DD/MM/YYYY'
            maxDate={new dayjs()}
            onChange={(change) => handleChange(change)}
            label={label}
            value={value}
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
        >
            {child}
        </DatePicker>
    );
}

export default CustomDatePicker;
