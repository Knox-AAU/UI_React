import { createTheme } from "@mui/material/styles";

const ThemeOptions = createTheme({
    palette: {
        type: 'light',
        text: {
            primary: '#ffffff',
            secondary: '#ffffff'
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& svg': {
                        color: '#ffffff'
                    },
                    '& label': {
                        '&.Mui-focused': {
                            color: '#ffffff'
                        }
                    },
                    '& .MuiOutlinedInput-root': {
                        '& > Fieldset': {
                            borderColor: '#ffffff'
                        },
                        '& .Mui-focused': {
                            '& > Fieldset': {
                                borderColor: '#ffffff',
                            }
                        },
                        '&:hover': {
                            '& > Fieldset': {
                                borderColor: '#dedede'
                            }
                        } 
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#242526',
                    padding: 10,
                    color: '#ffffff',
                    '& .MuiButtonBase-root': {
                        color: '#ffffff'
                    },
                    '& .MuiPickersDay-root': {
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#3874cb',
                            color: '#ffffff'
                        },
                        '&:disabled': {
                            color: '#d70202'
                        }
                    },
                    '& svg': {
                        color: '#ffffff'
                    }
                }
            }
        }
    }
});

export default ThemeOptions;
