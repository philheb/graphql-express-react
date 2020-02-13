import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import AuthContextProvider from "./context/AuthContext";
import MainNavigation from "./components/navigation/MainNavigation";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <MainNavigation />
        <main className='main-content'>
          <Routes />
        </main>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
