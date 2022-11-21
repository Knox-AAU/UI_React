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
import GetSources from "../Services/SourcesService";

export default function AdvancedSideBar({ isOpen, options, setOptions }) {

    return (
        <Collapse
            in={isOpen}
            timeout={20}>
            <ThemeProvider theme={ThemeOptions}>
                <div className='sidebar'>
                    <SourcesSelectComponent
                        header="Databases"
                        options={options}
                        setOptions={setOptions}
                    />
                    <AuthorComponent
                        header="Authors"
                        options={options}
                        setOptions={setOptions}
                    />
                    <CategoryComponent
                        header="Categories"
                        options={options}
                        setOptions={setOptions}
                    />
                    <TimePeriodComponent
                        header="Time period"
                        options={options}
                        setOptions={setOptions}
                    />
                </div>
            </ThemeProvider>
        </Collapse>
    );
}

function SourcesSelectComponent({header, options, setOptions}) {
    let sources = GetSources();
    let checkboxes = CreateCheckbox(sources, options, setOptions);

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
                        <DatePicker label="From" options={options} setOptions={setOptions} />
                        <DatePicker label="To" options={options} setOptions={setOptions} />
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}

function AuthorComponent({header, options, setOptions}) {
    let authors = GetAuthors();

    const handleChange = (value) => {
        setOptions(previousState => {
            return {...previousState, authors: value}
        });
    };

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
                onChange={(change) => handleChange(change)}
                loading={true}
                multiple={true}
                id="tags-outlined"
                options={authors}
                getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                filterSelectedOptions={true}
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

    const handleChange = (value) => {
        setOptions(previousState => {
            return {...previousState, categories: value}
        });
    };

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
                    onChange={(e, value) => handleChange(value)}
                    loading={true}
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
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