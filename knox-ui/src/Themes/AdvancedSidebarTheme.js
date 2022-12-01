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
                        color: '#ffffff',
                        '& .Mui-TouchRipple-root': {
                            backgroundColor: '#ff00dc'
                        }
                    },
                    '& .MuiPickersDay-root': {
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#f00dc',
                            color: '#ffffff'
                        },
                        '&:disabled': {
                            color: '#d70202'
                        }
                    },
                    '& .MuiPickersDay-root:focus': {
                        color: '#000000',
                        backgroundColor: '#ffffff'
                    },
                    '& .MuiPickersDay-today': {
                        color: '#000000',
                        backgroundColor: '#ffffff'
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
