import React from "react";
import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

// https://mui.com/x/react-date-pickers/date-picker/
function CustomDatePicker({label}) {
    const color = '#ffffff';
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    // Skal måske udskiftes med: https://mui.com/x/react-date-pickers/date-range-picker/
    return (
        <DatePicker
            views={['year', 'month']}
            maxDate={new dayjs()}
            label={label}
            value={value}
            onChange={handleChange}
            renderInput={(params) =>
                <TextField
                    {...params}
                    sx={{
                        input: { color },
                        label: { color },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ffffff',
                            },
                            '&:hover fieldset': {
                                borderColor: '#dedede',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ffffff',
                            }}
                    }}
                /> }
        />
    );
}

export default CustomDatePicker;
