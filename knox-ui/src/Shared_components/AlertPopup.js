import {Alert, Snackbar} from "@mui/material";
import React from "react";

export function AlertPopup({isAlertOpen, setIsAlertOpen, alertMessages}) {
    const handleOnAlertClosed = () => setIsAlertOpen(false);

    return (
        <Snackbar open={isAlertOpen} onClose={handleOnAlertClosed} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert className={"ps-4 pe-4"} variant={"filled"} severity="error" sx={{ width: '100%' }}>
            <span>Error:<br/></span>
            { alertMessages?.map((msg, index) => (<span key={index} className={"ps-2"}>{ msg }<br/></span>)) }
        </Alert>
    </Snackbar>
    );
}

export default AlertPopup;