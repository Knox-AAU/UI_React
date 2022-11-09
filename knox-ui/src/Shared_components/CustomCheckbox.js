import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";


function Checkbox({name, options, set_options}) {
    const handle_check = (name, isChecked) => {
        if (isChecked) set_options([...options, name]);
        else set_options(options.filter((x) => x !== name));
    };

    return (
        <FormControlLabel
            label={name}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    className="default_checkbox"
                    defaultChecked
                    name={name}
                    onChange={(e) => handle_check(e.target.name,e.target.checked)}
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
