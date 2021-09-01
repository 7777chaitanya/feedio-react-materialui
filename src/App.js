import React, { useState, useEffect } from "react";
import { Login, Home, Signup, ForgotPassword, MyPosts } from "./components";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";


const App = () => {
  const [docs, setDocs] = useState([]);
  const [like, setLike] = useState(false);
  

  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

  const handleLike = (e) =>{
    console.log("handleLIke");
    if(!like){
      setLike(true);
      
      }
    else{
      setLike(false);
    }
  }

  
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
            <Route path="/my-posts">
              <MyPosts handleLike={handleLike} like={like}/>
            </Route>
            <Route path="/" exact>
              <Home/>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};


export default App;
