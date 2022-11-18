import React from "react";
import { Stack, TextField, FormGroup, Autocomplete, Collapse, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeOptions from "../Themes/AdvancedSidebarTheme";
import DatePicker from "./CustomDatePicker";
import CreateCheckbox from './CustomCheckbox';
import "../Css/AdvancedSidebar.css";
import GetAuthors from '../Services/AuthorsService';
import GetCategories from "../Services/CategoriesService";

export default function AdvancedSideBar({ isOpen, advancedOptions, setAdvancedOptions }) {

    return (
        <Collapse
            in={isOpen}
            timeout={20}>
            <ThemeProvider theme={ThemeOptions}>
                <div className='sidebar'>
                    <DBSelectComponent
                        header="Databases"
                        options={advancedOptions}
                        setOptions={setAdvancedOptions}
                    />
                    <AuthorComponent
                        header="Authors"
                        options={advancedOptions}
                        setOptions={setAdvancedOptions}
                    />
                    <CategoryComponent
                        header="Categories"
                        options={advancedOptions}
                        setOptions={setAdvancedOptions}
                    />
                    <TimePeriodComponent
                        header="Time period"
                        options={advancedOptions}
                        setOptions={setAdvancedOptions}
                    />
                </div>
            </ThemeProvider>
        </Collapse>
    );
}

function DBSelectComponent({header, options, setOptions}) {
    let checkboxes = CreateCheckbox(options, setOptions);

    return (
        <div className='sidebar-component-top'>
            <h5>{header}</h5>
            <FormGroup>
                {checkboxes}
            </FormGroup>
        </div>
    );
}

function TimePeriodComponent({header, options, setOptions}) {

    return (
        <div className='sidebar-component'>
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

function AuthorComponent({header, options, setOptions}) {
    let authors = GetAuthors();

    return (
        <div className='sidebar-component'>
            <h5>{header}</h5>
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
                    loading={true}
                    multiple
                    id="tags-outlined"
                    options={authors}
                    getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='e.g. Anders Andersen'
                        />
                    )}
                />
            </div>
        </div>
    );
}

function CategoryComponent({header, options, setOptions}) {
    let categories = GetCategories();

    return (
        <div className='sidebar-component'>
            <h5>{header}</h5>
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
                    loading={true}
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.category}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='e.g. Sport'
                        />
                    )}
                />
            </div>
        </div>
    );
}