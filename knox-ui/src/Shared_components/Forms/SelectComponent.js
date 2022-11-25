import React, {useEffect, useState} from "react";
import {Checkbox} from "../CustomCheckbox";
import {FormGroup} from "@mui/material";

export function SelectComponent({header, selectedValues, setSelectedValues, fetchAllValuesCallback}) {
    const [allValues, setAllValues] = useState([]);

    // Initialization
    useEffect(() => {
        fetchAllValuesCallback()
            .then(values => {
                setAllValues(values);
                setSelectedValues(values.map(x => x.id));
            })
            .catch(console.error);
    }, []);

    const handleCheckboxChanged = (e, isChecked) => {
        const value = parseInt(e.target.value);
        if (isChecked) {
            setSelectedValues([...selectedValues, value]);
        }
        else {
            let newFilter = [...selectedValues].filter(x => x.id !== value);
            setSelectedValues(newFilter);
        }
    }

    return (
        <div className='sidebar-component-top'>
            <h5>{header}</h5>
            <FormGroup>
                { allValues.map(x => Checkbox({id: x.id, name: x.name, onChangeCallback: handleCheckboxChanged })) }
            </FormGroup>
            { allValues?.length === 0 ? <span>Found no values.</span> : null }
        </div>
    );
}

export default SelectComponent;