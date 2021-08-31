import React, { useState, useEffect } from "react";
import { Login, Home, Signup, ForgotPassword } from "./components";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const [docs, setDocs] = useState([]);
  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const documentArray = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      documentArray.push(doc.data());
    });
    setDocs(documentArray);
  }, []);
  
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
