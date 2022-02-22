import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar.js";
import HomePage from "./components/HomePage";
import AccountProfile from "./components/AccountProfile";
import SignUp from "./components/SignUp";
import ClubAdminPage from "./components/ClubAdminPage";
import ClubPage from "./components/ClubPage";
import SearchForm from "./components/SearchForm";
import Calender from "./components/Calender";
import Login from "./components/Login";


function App() {
  return (
    <div className="App">
      <Router>
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
          <Route path="/search" exact>
            <SearchForm />
            </Route>
          <Route path="/calender" exact>
            <Calender />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
