import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

// https://mui.com/x/react-date-pickers/date-picker/
function CustomDatePicker({label, child}) {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <DatePicker
            views={['year', 'month', 'day']}
            inputFormat='DD/MM/YYYY'
            maxDate={new dayjs()}
            label={label}
            value={value}
            onChange={handleChange}
            renderInput={(params) =>
                <TextField
                    {...params}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                            borderColor: '#ffffff',
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
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
