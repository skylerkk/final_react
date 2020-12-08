import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import CreateCharacterSheet from './Components/CreateCharacterSheet';
import CharacterSheet from "./Components/CharacterSheet";
import AllProfiles from "./Components/ProfileList";
import OtherProfile from "./Components/OtherProfile";
import { AppProvider } from './Utilities/AppContext';
import { TokenProvider } from './Utilities/TokenContext';

function App() {


  const pages = [
    { readableName: "TTRPG Character Sheet Creator", url: "/" },
    { readableName: "Sign up", url: "/signup" },
    { readableName: "Login", url: "/login" },
    { readableName: "Profile", url: "/profile" },
    { readableName: "Logout", url: "/logout" }
  ]

  // useEffect(() => {
  //   let spage = window.localStorage.getItem("currentPage");
  //   if (spage !== currentPage) {
  //     setCurrentPage(JSON.parse(spage));
  //   }
  // }, [currentPage]);

  const initialContext = {pages};

  return (
    <AppProvider value={initialContext}>
      <TokenProvider>
        <Router>
          <Navbar/>
          <div>
            <Switch>
              <Route exact={true} path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/create_character/">
                <CreateCharacterSheet />
              </Route>
              <Route path="/characters/:id">
                <CharacterSheet/>
              </Route>
              <Route path="/all_users">
                <AllProfiles />
              </Route>
              <Route path="/profiles/:id">
                <OtherProfile />
              </Route>
            </Switch>
          </div>
        </Router>
      </TokenProvider>
    </AppProvider>
  );
}

export default App;