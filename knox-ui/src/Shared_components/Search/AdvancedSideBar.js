import React from "react";
import {Collapse, ThemeProvider} from "@mui/material";
import ThemeOptions from "../../Themes/AdvancedSidebarTheme";
import "../../Css/AdvancedSidebar.css";
import GetCategories from "../../Services/CategoriesService";
import GetSources from "../../Services/SourcesService";
import {SelectComponent} from "../Forms/SelectComponent";
import {TimePeriodComponent} from "../Forms/TimePeriodComponent";
import {AutocompleteComponent} from "../Forms/AutocompleteComponent";
import GetAuthors from "../../Services/AuthorsService";

export default function AdvancedSideBar({ isOpen,
                                            sourceFilter,
                                            setSourceFilter,
                                            beforeDate,
                                            setBeforeDate,
                                            afterDate,
                                            setAfterDate,
                                            setAuthorFilter,
                                            setCategoryFilter }) {
    return (
        <Collapse
            in={isOpen}
            timeout={20}>
            <ThemeProvider theme={ThemeOptions}>
                <div className='sidebar'>
                    <SelectComponent
                        header="Sources"
                        selectedValues={sourceFilter}
                        setSelectedValues={setSourceFilter}
                        fetchAllValuesCallback={GetSources}
                    />
                    <TimePeriodComponent
                        header="Time period"
                        beforeDate={beforeDate}
                        setBeforeDate={setBeforeDate}
                        afterDate={afterDate}
                        setAfterDate={setAfterDate}
                    />
                    <div className={"sidebar-section"}>
                        <h5 className={"mb-3"}>Other filters</h5>
                        <AutocompleteComponent
                            header={"Authors"}
                            setSelectedValues={setAuthorFilter}
                            fetchAllValuesCallback={GetAuthors}
                        />
                        <AutocompleteComponent
                            header={"Categories"}
                            setSelectedValues={setCategoryFilter}
                            fetchAllValuesCallback={GetCategories}
                        />
                    </div>
                </div>
            </ThemeProvider>
        </Collapse>
    );
}