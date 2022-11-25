import React, {useEffect, useState} from "react";
import { Stack, TextField, FormGroup, Autocomplete, Collapse, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ThemeOptions from "../../Themes/AdvancedSidebarTheme";
import DatePicker from "../CustomDatePicker";
import {Checkbox} from '../CustomCheckbox';
import "../../Css/AdvancedSidebar.css";
import GetAuthors from '../../Services/AuthorsService';
import GetCategories from "../../Services/CategoriesService";
import GetSources from "../../Services/SourcesService";

export default function AdvancedSideBar({ isOpen,
                                            sourceFilter,
                                            setSourceFilter,
                                            beforeDate,
                                            setBeforeDate,
                                            afterDate,
                                            setAfterDate,
                                            authorFilter,
                                            setAuthorFilter,
                                            categoryFilter,
                                            setCategoryFilter }) {

    return (
        <Collapse
            in={isOpen}
            timeout={20}>
            <ThemeProvider theme={ThemeOptions}>
                <div className='sidebar'>
                    <SourcesSelectComponent
                        header="Sources"
                        sourceFilter={sourceFilter}
                        setSourceFilter={setSourceFilter}
                    />
                    <TimePeriodComponent
                        header="Time period"
                        beforeDate={beforeDate}
                        setBeforeDate={setBeforeDate}
                        afterDate={afterDate}
                        setAfterDate={setAfterDate}
                    />
                    <div className={"sidebar-component"}>
                        <h5 className={"mb-3"}>Other filters</h5>
                        <AuthorComponent
                            header="Authors"
                            authorFilter={authorFilter}
                            setAuthorFilter={setAuthorFilter}
                        />
                        <CategoryComponent
                            header="Categories"
                            categoryFilter={categoryFilter}
                            setCategoryFilter={setCategoryFilter}
                        />
                    </div>
                </div>
            </ThemeProvider>
        </Collapse>
    );
}

function SourcesSelectComponent({header, sourceFilter, setSourceFilter}) {
    const [allSources, setAllSources] = useState([]);

    // Initialization
    useEffect(async () => {
        try {
            let sources = await GetSources();
            setAllSources(sources);
            setSourceFilter(sources.map(x => x.id));
        }
        catch (e) {
            console.error("Failed to load sources: " + e.message);
        }
    }, []);

    const handleCheckboxChanged = (e, isChecked) => {
        const id = parseInt(e.target.value);
        if (isChecked) {
            setSourceFilter([...sourceFilter, id]);
        }
        else {
            let newFilter = [...sourceFilter].filter(x => x !== id);
            setSourceFilter(newFilter);
        }
    }

    return (
        <div className='sidebar-component-top'>
            <h5>{header}</h5>
            <FormGroup>
                { allSources.map(x => Checkbox({id: x.id, name: x.name, onChangeCallback: handleCheckboxChanged })) }
            </FormGroup>
            <span>Found {allSources.length} source(s).</span>
        </div>
    );
}

function TimePeriodComponent({header, beforeDate, setBeforeDate, afterDate, setAfterDate}) {

    return (
        <div className='sidebar-component'>
            <h5 className="mb-3">{header}</h5>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker label="From" date={afterDate} setDate={setAfterDate} />
                        <DatePicker label="To" date={beforeDate} setDate={setBeforeDate} />
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}

function AuthorComponent({header, setAuthorFilter}) {
    const [allAuthors, setAllAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialization
    useEffect(() => {
        setIsLoading(true);
        GetAuthors()
            .then(authors => setAllAuthors(authors))
            .then(() => setIsLoading(false))
            .catch(console.error);

    }, []);

    const handleChange = (value) => {
        setAuthorFilter(value);
    };

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
                    multiple
                    id="tags-outlined"
                    options={allAuthors}
                    filterSelectedOptions={true}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={header}
                        />
                    )}
                />
            </div>
            <span>Found {allAuthors.length} author(s).</span>
        </div>
    );
}

function CategoryComponent({header, setCategoryFilter}) {
    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialization
    useEffect(() => {
        setIsLoading(true);
        GetCategories()
            .then(categories => setAllCategories(categories))
            .then(() => setIsLoading(false))
            .catch(console.error);

    }, []);

    const handleChange = (value) => {
        console.log(value);
        setCategoryFilter(value);
    };

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
                    multiple
                    id="tags-outlined"
                    options={allCategories}
                    getOptionLabel={x => x.name}
                    isOptionEqualToValue={(x, y) => x.id === y.id}
                    filterSelectedOptions={true}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={header}
                        />
                    )}
                />
                <span>Found {allCategories.length} {allCategories.length === 1 ? 'category' : 'categories'}.</span>

            </div>
        </div>
    );
}