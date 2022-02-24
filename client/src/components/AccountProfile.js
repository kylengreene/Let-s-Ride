import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Container } from "@mui/material";
import { retrieveRider } from "../api/rider-api";
import AuthContext from "../context/AuthContext"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AccountProfile() {

  const authContext = React.useContext(AuthContext);


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
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
    <Button onClick = {() => retrieveRider(authContext.credentials.username)}>fetch</Button>
    </Container>
  );
}


export default withRouter(AccountProfile);
