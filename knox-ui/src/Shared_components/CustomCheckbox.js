import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import GetSources from "../Services/SourcesService";

export function CreateCheckbox(options, setOptions) {
    let sources = GetSources();
    let result;

    for(let i = 0; i < sources.length; i++) {
        result += Checkbox(sources[i], options, setOptions);
    }

    return result;
}

export function Checkbox({ sourceName, options, setOptions}) {
    const handleCheck= (name, isChecked) => {
        if (isChecked) {
            setOptions([...options.sources, name]);
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
