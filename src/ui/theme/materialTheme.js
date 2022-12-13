import * as React from 'react';
import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
        palette: {
            disabled: {
                main: "#B4B4B4"
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        width: '85px',
                        height: '35px',
                        fontFamily: 'Nunito',
                        fontSize: '16px',
                        borderColor: '#5D7FA3',
                        marginTop: '20px',
                        color: '#5D7FA3',
                    },
                },
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        marginLeft: '0px'
                    }
                }
            }
        },
    })
;