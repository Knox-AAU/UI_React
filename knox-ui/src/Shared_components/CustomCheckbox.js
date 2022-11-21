import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

export function CreateCheckbox(sources, options, setOptions) {
    let result;

    if (sources.length > 0) {
        result = Checkbox(sources[0], options, setOptions);

        for(let i = 1; i < sources.length; i++) {
            result += Checkbox(sources[i], options, setOptions);
        }
    }

    for(let i = 0; i < sources.length; i++) {
        result += Checkbox(sources[i], options, setOptions);
    }

    return result;
}

export function Checkbox(sourceName, options, setOptions) {
    const handleCheck= (name, isChecked) => {
        if (isChecked) {
            setOptions(previousState => {
                return {...previousState, sources: name}
            });
        } else {
            setOptions(options.sources.filter(x => x !== name));
        }
    }

    return (
        <FormControlLabel
            label={sourceName}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    defaultChecked
                    name={sourceName}
                    onChange={(e) => handleCheck(e.target.name,e.target.checked)}
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

export default CreateCheckbox;
