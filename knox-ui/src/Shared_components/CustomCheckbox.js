import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

export function Checkbox({value, name, onChangeCallback}) {

    return (
        <FormControlLabel
            key={value}
            label={name}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    defaultChecked={true}
                    name={name}
                    value={value}
                    onChange={(event, isChecked) => onChangeCallback(event, isChecked)}
                    sx={{
                        color: '#ffffff',
                        '&.Mui-checked': {
                            color: '#ffffff',
                        }
                    }}
                />
            }
        />
    );
}

export default Checkbox;
