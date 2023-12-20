import * as React from 'react';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        disabled: {
            main: "#B4B4B4"
        },
        primary:  {
           main: "#F4E041"
        },
        secondary: {
            main: "#00BDD3"
        },
        background: {
            main: "#F8F8F8"
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 28,
                    textTransform: 'initial',
                    width: '120px',
                    height: '35px',
                    fontFamily: 'Nunito',
                    fontSize: '18px',
                    marginTop: '10px',
                },
            },
        },
    }
});