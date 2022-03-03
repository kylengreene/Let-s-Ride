import { render } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import withRouter from "../utility/withRouter";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { findClubById } from "../api/club";
import AuthContext from "../context/AuthContext";
import MapDisplay from "./Google-Maps/MapDisplay";
import Marker from "./Google-Maps/Marker";
import { useSelector, useDispatch } from "react-redux";
import {clubById} from "../actions";
import { useEffect, useState } from "react";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ClubDetailPage() {
// const club = useSelector((state) => state.clubs);
// const dispatch = useDispatch();
// let renderStatus = '';
// useEffect(() =>{
//     dispatch("COORDINATES_SET");
// }, []);
  let { id } = useParams();

  const [club, setClub] = React.useState(null);
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [markerLocations, setMarkerLocations ]= React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await findClubById(id);
      setClub(response);
     console.log("loggin reponbse in deatails", response);
      markerLocations.push({id: response.clubId, lat : response.clubLat, lng : response.clubLng });
      console.log("logging from detail page", markerLocations);
    };
    fetchData();
    
  }, [id]);
 
  if (!club) {
    return <h5>loading</h5>;
    
  }
  return (
    <Container>
      <Box sx={{ flexGrow: 1, m: 4, mx: "auto" }} maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4}>
            {/*need to replace with data imported from*/}
            <Item>
              <img
                width="250px"
                alt="profile"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{club.clubName}</Item>
          </Grid>
          <Grid item style={{ height: "5vh", width: "100%" }} xs={4}>
            <Item>
              <MapDisplay 
              markerLocations={markerLocations}
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{}</Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default withRouter(ClubDetailPage);
