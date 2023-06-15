import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import Settings from "./pages/settings/settings";
import Login from "./pages/Login/Login";
import Signup from "./pages/Sign_Up/Signup";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">{user ? <Home /> : <Signup />}</Route>
        {/* <Route path="/signup">{<Signup />}</Route> */}

        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Signup />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Signup />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
