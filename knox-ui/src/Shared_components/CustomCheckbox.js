import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import GetSources from "../Services/SourcesService";

export function CreateCheckbox(dbOptions, options, setOptions) {
    let sources = GetSources();
    let result;

    for(let i = 0; i < sources.length; i++) {
        result += Checkbox(sources[i], options, setOptions);
    }

    return result;
}

export function Checkbox({ dbOption, options, setOptions}) {
    const handleCheck= (name, isChecked) => {
        if (isChecked) {
            setOptions([...options, name]);
        } else {
            setOptions(options.filter(x => x !== name));
        }
    }

    return (
        <FormControlLabel
            label={dbOption}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    className="default_checkbox"
                    defaultChecked
                    name={dbOption}
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
