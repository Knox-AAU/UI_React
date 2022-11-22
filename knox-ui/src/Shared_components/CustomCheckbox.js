import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import GetSources from "../Services/SourcesService";

export function CreateCheckbox(sources, options, setOptions) {
    let result = [];

    if (sources.length > 0) {
        for(let i = 0; i < sources.length; i++) {
            result[i] = (<Checkbox source={sources[i]} key={sources[i].id} options={options} setOptions={setOptions} />);
        }
    }

    return result;
}

export function Checkbox({source, options, setOptions}) {
    const handleChange= (event, isChecked) => {
        if (options.sources !== undefined && isChecked) {
            setOptions(previousState => {
                return {...previousState, sources: source}
            });
        } else if (options.sources !== undefined && !isChecked) {
            setOptions(options.sources.filter(x => x.id !== event.target.id));
        } else {
            setOptions(options.sources = GetSources());
        }
    }

    return (
        <FormControlLabel
            label={source.name}
            sx={{
                color: '#ffffff',
            }}
            control={
                <MuiCheckbox
                    defaultChecked
                    name={source.name}
                    onChange={(event, isChecked) => handleChange(event, isChecked)}
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
