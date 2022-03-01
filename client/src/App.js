import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import NavBar from "./components/NavBar.js";
import HomePage from "./components/HomePage";
import AccountProfile from "./components/AccountProfile";
import SignUp from "./components/SignUp";
import ClubAdminPage from "./components/ClubAdminPage";
import ClubPage from "./components/ClubPage";
import ClubForm from "./components/ClubForm";
import RideForm from "./components/RideForm";
import SearchForm from "./components/SearchForm";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import ClubDetailPage from "./components/ClubDetailPage";
import RideDetailPage from "./components/RideDetailPage";
import Map from "./components/Google-Maps/mapDisplay";
import GeoCoding from "./components/Google-Maps/GeoCoding";
import {useState, useEffect} from 'react';
import AuthContext from "./context/AuthContext";
import {logout, refresh, login} from "./api/login";
import TestApiFuncs from "./components/TestApiFuncs";


function App() {

  const [credentials, setCredentials] = useState();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    refresh()
      .then(principal => setCredentials(principal))
      .catch(() => setCredentials())
      .finally(() => setInitialized(true));
  }, [])

  const auth = {
    credentials,
    login: (principal) => setCredentials(principal),
    logout: () => {
      logout().finally(() => setCredentials());
    }
  };

  return (
    <div className="App">
      <Router>
      <AuthContext.Provider value={auth}>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/account" exact>
            <AccountProfile />
          </Route>
          <Route path="/test">
            <TestApiFuncs />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/clubform" exact>
            <ClubForm />
          </Route>
          <Route path="/rideform" exact>
            <RideForm />
          </Route>
          <Route path="/admin" exact>
            <ClubAdminPage />
          </Route>
          <Route path="/login" exact>
            <Login />
            </Route>
          <Route path="/club" exact>
            <ClubPage />
          </Route>
          <Route path ="/club/:id"exact>
            <ClubDetailPage/>
          </Route>
          <Route path ="/ride"exact>
            <RideDetailPage/>
          </Route>
          <Route path="/search" exact>
            <SearchForm />
            </Route>
          <Route path="/calendar" exact>
            <Calendar />
          </Route>
          <Route path="/map" exact>
            <Map />
          </Route>
          <Route path="/geocode" exact>
            <GeoCoding />
          </Route>
        </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}


export default App;
