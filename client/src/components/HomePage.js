import { render } from "@testing-library/react";
import withRouter from '../utility/withRouter';
import { Grid, Hidden } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Upcoming } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MapDisplay from './Google-Maps/MapDisplay';
import Calendar from './Calendar';
import ClubDetailPage from "./ClubDetailPage";
import * as React from "react";
import GeoCoding from "./Google-Maps/GeoCoding"
import AuthContext from "../context/AuthContext";
import { findClubsByAddress } from "../api/club";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function HomePage (){
    let zip  = 55430;

    const [club, setClub] = React.useState(null);
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [markerLocations, setMarkerLocations ]= React.useState([]);
    React.useEffect(() => {
      const fetchData = async () => {
        const response = await findClubsByAddress(zip);
        setClub(response);
       
        for (let index = 0; index < response._embedded.clubs.length; index++) {
            markerLocations.push(response._embedded.clubs[index])
            
        }
        console.log("locccs",markerLocations);
        // setMarkerLocations(response._embedded.clubs);
      };
      fetchData();
       
    }, [zip]);
 
    if (!club) {
      return <h5>loading</h5>;
      
    }
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid 
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
spacing={2}>
        <Grid item xs={12} md={12}>
            <Item><h1> Let's Ride</h1></Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item> <MapDisplay markerLocations={markerLocations}/></Item>
          </Grid>
          <Grid  item  xs={6} md={6}>
            <Item><ClubDetailPage/></Item>
          </Grid>
          <Grid item xs={6} md={10} spacing={2}>
            <Item ><Calendar/></Item>
          </Grid>
       
        
        </Grid>
      </Box>
        )
}

export default withRouter(HomePage);
