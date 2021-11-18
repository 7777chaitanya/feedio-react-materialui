import React, { useState, useEffect } from "react";
import {
  Login,
  Home,
  Signup,
  ForgotPassword,
  MyPosts,
  AllPosts,
  Profile,
  Footer,
} from "./components";
import "./index.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import PrivateRoute from "./components/PrivateRoute";
import { CurrentUserDetailsProvider } from "./contexts/CurrentUserDetailsContext";
import { AllUserDetailsProvider } from "./contexts/AllUserDetailsContext";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import "./App.css";
import { ClickProvider } from "./contexts/ClickContext";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  const [docs, setDocs] = useState([]);
  const [like, setLike] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [dummy, setDummy] = useState(true);

  const theme = createTheme({
    palette: {
      // primary: {
      //   main: "rgb(140,233,23,0.2)",
      //   dark: "#1db954",
      // },
      // secondary : {
      //   // main : "#808000",
      //   main: "#1db954",
      //   dark : "rgb(135,23,43)"
      // }
      primary: {
        main: "rgb(107,187,117)",
        dark: "rgb(18,16,14)",
      },
      secondary: {
        // main : "#808000",
        // main: "rgb(232, 243, 236)",
        main: "rgb(232, 232, 232)",

        dark: "rgb(0, 171, 107)",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            scrollbarColor: "#6b6b6b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "lightgray",
              width : "0.3rem"
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#9dd2a4",
              minHeight: 24,
              border: "1px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
    },
  });

  const handleDummy = () => {
    setDummy((prevState) => !prevState);
  };

  useEffect(async () => {
    let allPosts = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
    setAllPosts(allPosts);
  }, []);

  const handleLike = (e) => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const handleAllPostsUpdateDeleteOptimistically = (input, email) => {
    console.log("handleAllPostsUpdateDeleteOptimistically", input, email);
    let localPosts = [...allPosts];
    let refPost = localPosts.find((post) => {
      return post.email === email;
    });
    refPost.posts = input;
    setAllPosts(localPosts);
    console.log("updater => ", localPosts);
  };

  return (
    <div className="mainBox">

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

        <ThemeProvider theme={theme}>
        <CssBaseline />

          <AuthProvider>
            <CurrentUserDetailsProvider>
              <AllUserDetailsProvider>
                <ClickProvider>
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
                    {/* <Route path="/my-posts" >
              <MyPosts handleLike={handleLike} like={like} allPosts={allPosts}/>
            </Route> */}
                    <Route path="/my-posts">
                      <MyPosts
                        handleLike={handleLike}
                        like={like}
                        allPosts={allPosts}
                        handleAllPostsUpdateDeleteOptimistically={
                          handleAllPostsUpdateDeleteOptimistically
                        }
                      />
                    </Route>
                    <Route path="/all-posts">
                      <AllPosts
                        handleLike={handleLike}
                        like={like}
                        allPosts={allPosts}
                        handleAllPostsUpdateDeleteOptimistically={
                          handleAllPostsUpdateDeleteOptimistically
                        }
                      />
                    </Route>
                    <Route
                      path="/profile/:username"
                      render={(props) => <Profile {...props} />}
                    />
                    {/* <Route path="/" exact>
              <Home />
            </Route> */}
                    <PrivateRoute
                      component={Home}
                      allPosts={allPosts}
                      handleAllPostsUpdateDeleteOptimistically={
                        handleAllPostsUpdateDeleteOptimistically
                      }
                      handleDummy={handleDummy}
                      path="/"
                      exact
                    />
                  </Switch>
                  <Footer />
                </ClickProvider>
              </AllUserDetailsProvider>
            </CurrentUserDetailsProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
