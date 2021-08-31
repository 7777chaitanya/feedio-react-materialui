import React from "react";
import { Login, Home, Signup, ForgotPassword } from "./components";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
