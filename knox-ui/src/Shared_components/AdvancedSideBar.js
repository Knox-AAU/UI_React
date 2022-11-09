import React from "react";
import Collapse from "react-bootstrap/Collapse";
import StickyBox from "react-sticky-box";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from "./CustomDatePicker";
import Checkbox from './CustomCheckbox';
import "../Css/AdvancedSidebar.css";

export default function AdvancedSideBar({ open, advancedOptions, setAdvancedOptions }) {

  return (
      <div>
        <Collapse in={open} dimension="width" >
            <StickyBox offsetTop={50} className="sidebar">
                <Card>
                    <DBSelectComponent header="Databases" options={advancedOptions} setOptions={setAdvancedOptions}/>
                    <AuthorComponent header="Authors"/>
                    <CategoryComponent header="Categories"/>
                    <TimePeriodComponent header="Time period"/>
                </Card>
            </StickyBox>
        </Collapse>
      </div>
  );
}

function DBSelectComponent({header, options, setOptions}) {
    // https://mui.com/material-ui/react-checkbox/

    return (
        <div className="sidebar_component">
            <h5>{header}</h5>
            <FormGroup>
                <Checkbox name="Grundfos A/S" options={options} set_options={setOptions} />
                <Checkbox name="Nordjyske medier" options={options} set_options={setOptions} />
            </FormGroup>
        </div>
    );
}

function TimePeriodComponent({header}) {

    return (
        <div className="sidebar_component">
            <h5>{header}</h5>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker label="From"/>
                        <DatePicker label="To"/>
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}

function AuthorComponent({header}) {
    const authors = [
        {firstname: 'TODO', middleName: '', lastname: 'GetAuthors'}
    ]

    // https://mui.com/material-ui/react-autocomplete/
    return (
        <div className="sidebar_component">
            <h5>{header}</h5>
            <div>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={authors}
                    getOptionLabel={(option) => option.middleName.length >= 1
                        ? option.firstname + ' ' + option.middleName[0] + '. ' + option.lastname
                        : option.firstname + ' ' + option.lastname}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Authors"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#dedede',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ffffff',
                                    }
                                }
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
}

function CategoryComponent({header}) {
    const authors = [
        {category: 'TODO GetCategories', number: 0}
    ]

    // https://mui.com/material-ui/react-autocomplete/
    return (
        <div className="sidebar_component">
            <h5>{header}</h5>
            <div>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={authors}
                    getOptionLabel={(option) => option.category}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Categories"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#dedede',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ffffff',
                                    }
                                }
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
}