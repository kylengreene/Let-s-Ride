import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import NavBar from "./components/NavBar.js";
import HomePage from "./components/HomePage";
import AccountProfile from "./components/AccountProfile";
import SignUp from "./components/SignUp";
import ClubAdminPage from "./components/ClubAdminPage";
import ResultsPage from "./components/ResultsPage";
import ClubForm from "./components/ClubForm";
import RideForm from "./components/RideForm";
import SearchForm from "./components/SearchForm";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import ClubDetailPage from "./components/ClubDetailPage";
import RideDetailPage from "./components/RideDetailPage";
import Map from "./components/Google-Maps/mapDisplay";
import GeoCode from "./components/Google-Maps/GeoCode";
import {useState, useEffect} from 'react';
import AuthContext from "./context/AuthContext";
import {logout, refresh, login} from "./api/login";
import { CssBaseline } from "@material-ui/core";


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
      <CssBaseline />
      <Router>
      <AuthContext.Provider value={auth}>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountProfile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clubs" >
              <Route index element={<ResultsPage parameter="clubs" />} />
              <Route path=":id" element={<ClubDetailPage />} />
              <Route path=":clubId/admin" element={<ClubAdminPage />} />
              <Route path="new" element={<ClubForm />} />
            </Route>
            <Route path="/rides">
              <Route index element={<ResultsPage parameter="rides" />} />
              <Route path=":id" element={<RideDetailPage />} />
              <Route path="new" element={<RideForm />} />
            </Route>
            <Route path="search">
              <Route path="clubs" element={<SearchForm parameter="clubs" />}/>
              <Route path="rides" element={<SearchForm parameter="rides" />}/>
            </Route>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/map" element={<Map />} />
        </Routes>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}


export default App;
