import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/" render={() => <Home />} />
        </BrowserRouter>
    );
};

export default App;
