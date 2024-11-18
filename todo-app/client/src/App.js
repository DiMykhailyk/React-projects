import styles from "./styles/App.module.css";
import React from "react";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx"
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage.jsx";
import { TodosPage } from "./pages/TodosPage/TodosPage.jsx";
import {BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<RegistrationPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/todos" element={<TodosPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
