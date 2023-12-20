import './App.css';
import Main from "./components/Main/Main";
import { theme } from "./ui/theme/materialTheme";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header/Header";
import { GlobalStyles } from "@mui/material";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={{
                    body: { backgroundColor: theme.palette.background.main},
                }}
            />
            <div className="App">
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}

export default App;
