import React from 'react';
import background from './ui/resources/svg/background.svg';
import './App.css';
import ProgressIndicator from "./components/modules/ProgressIndicator";
import styled from "styled-components";
import {theme} from "./ui/theme/materialTheme";
import {ThemeProvider} from "@mui/material";
import WrapperForm from "./components/modules/WrapperForm";
import {StepsProvider} from './context/StepsContext'

function App() {

    return (
        <ThemeProvider theme={theme}>
            <StepsProvider>
                <Wrapper>
                    <ProgressIndicator/>
                    <WrapperForm/>
                </Wrapper>
            </StepsProvider>
        </ThemeProvider>

    );
}

const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
  background: url(${background});
`

export default App;
