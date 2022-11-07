import React from "react";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import StickyBox from "react-sticky-box";
import "../Css/AdvancedSidebar.css";

//Måske
/*import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
*/

function AdvancedSideBar({ open, advancedOptions, setAdvancedOptions }) {
  const HandleCheck = (name, isChecked) => {
    if (isChecked) setAdvancedOptions([...advancedOptions, name]);
    else setAdvancedOptions(advancedOptions.filter((x) => x !== name));
  };

  /*const [value, setValue] =
    (React.useState < Dayjs) | (null > dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };*/

  return (
    <div className="CollapseDiv">
      <Collapse in={open} dimension="width">
        <StickyBox offsetTop={50}>
          <div>
            <Card
              data-testid="card"
              body
              style={{
                background: "#3874CB",
                width: "400px",
                height: "94vh",
                border: "0px",
                borderRadius: "0px",
              }}
            >
              <div className="sidebar_component">
                <h2> Filter Datasets</h2>
                <div className="checkbox">
                  <ul className="nobullets">
                    <li>
                      <label>
                        <p className="sidebar_option_text">Grundfos</p>
                        <input
                          type="checkbox"
                          id="option0"
                          name="Grundfos A/S"
                          defaultChecked={true}
                          onChange={(e) =>
                            HandleCheck(e.target.name, e.target.checked)
                          }
                        />
                      </label>
                    </li>
                    <li>
                      <label>
                        <p className="sidebar_option_text">Nordjyske</p>
                        <input
                          type="checkbox"
                          id="option1"
                          name="Nordjyske Medier"
                          defaultChecked={true}
                          onChange={(e) =>
                            HandleCheck(e.target.name, e.target.checked)
                          }
                        />
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card
              data-testid="card"
              body
              style={{
                background: "#3874CB",
                width: "400px",
                height: "94vh",
                border: "0px",
                borderRadius: "0px",
              }}
            >
              <div className="sidebar_component">
                <h2> Advanced search</h2>
                <Stack spacing={3}>
                  <div>
                    <TextField
                      id="standard-search"
                      label="Author name"
                      type="search"
                      variant="standard"
                    />
                  </div>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="From date"
                          inputFormat="DD/MM/YYYY"
                          value={value}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                          label="To date"
                          inputFormat="DD/MM/YYYY"
                          value={value}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </Stack>
              </div>
            </Card>
          </div>
        </StickyBox>
      </Collapse>
    </div>
  );
}

export default AdvancedSideBar;
