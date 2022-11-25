import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";

export function AutocompleteComponent({header, setSelectedValues, fetchAllValuesCallback}) {
    const [allValues, setAllValues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialization
    useEffect(() => {
        setIsLoading(true);
        fetchAllValuesCallback()
            .then(values => setAllValues(values))
            .then(() => setIsLoading(false))
            .catch(console.error);
    }, []);

    const handleChange = (values) => {
        setSelectedValues(values);
    };

    const isOptionEqualToValue = (option, value) => {
        // Necessary since values may be either categories (id, name) or authors (just a string). Consider using a property selector or similar?
        return (option?.id ?? option) === (value?.id ?? value);
    }

    return (
        <div className={"sidebar-component"}>
            <div>
                <Autocomplete
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ffffff'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ffffff'
                            }
                        }
                    }}
                    onChange={(event, value) => handleChange(value)}
                    loading={isLoading}
                    getOptionLabel={x => x?.name ?? x}
                    isOptionEqualToValue={isOptionEqualToValue}
                    multiple
                    id="tags-outlined"
                    options={allValues}
                    filterSelectedOptions={true}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={header}
                        />
                    )}
                />
            </div>
            { allValues?.length === 0 ? <span>Found no values.</span> : null }
        </div>
    );
}