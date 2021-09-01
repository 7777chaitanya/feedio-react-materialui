import React, { useState, useEffect } from "react";
import { Login, Home, Signup, ForgotPassword, MyPosts } from "./components";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [docs, setDocs] = useState([]);
  const [like, setLike] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  
  console.log("allPosts => ", allPosts);

  useEffect(async () => {
    let allPosts = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
    setAllPosts(allPosts);
  }, []);

  const handleReloadAfterWassupUpload = async () =>{
    let allPosts = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
    setAllPosts(allPosts);
  }

  const handleLike = (e) => {
    console.log("handleLIke");
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

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
            <Route path="/my-posts" >
              <MyPosts handleLike={handleLike} like={like} allPosts={allPosts}/>
            </Route>
            <Route path="/" exact>
              <Home handleReloadAfterWassupUpload={handleReloadAfterWassupUpload}/>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
