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
import SearchForm from "./components/SearchForm";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import ClubDetailPage from "./components/ClubDetailPage";
import {useState, useEffect} from 'react';
import AuthContext from "./context/AuthContext";
import {logout, refresh, login} from "./api/login";


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
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/admin" exact>
            <ClubAdminPage />
          </Route>
          <Route path="/club" exact>
            <ClubPage />
          </Route>
          <Route path ="/club/:id"exact>
            <ClubDetailPage/>
          </Route>
          <Route path="/search" exact>
            <SearchForm />
            </Route>
          <Route path="/calendar" exact>
            <Calendar />
          </Route>
        </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}


export default App;
