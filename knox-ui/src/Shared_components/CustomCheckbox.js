import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

export function Checkbox({id, name, onChangeCallback}) {

    return (
        <FormControlLabel
            key={id}
            label={name}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    defaultChecked={true}
                    name={name}
                    value={id}
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
