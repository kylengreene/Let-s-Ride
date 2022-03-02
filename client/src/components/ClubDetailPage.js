import { render } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import withRouter from "../utility/withRouter";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { findClubById } from "../api/club";
import AuthContext from "../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ClubDetailPage() {
  let { id } = useParams();

  const [club, setClub] = React.useState(null);
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
    const response = await (await findClubById(id)).json();
    setClub(response);
    }
    fetchData();
}, [id]);

  if (!club) {
    return <h5>loading</h5>
  }


  return (
      <Container>
    <Box sx={{ flexGrow: 1, m: 4, mx: "auto" }} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={4} >
          {/*need to replace with data imported from*/}
          <Item>
         <img width = "250px" alt="profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
         </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>jkgu</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
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
