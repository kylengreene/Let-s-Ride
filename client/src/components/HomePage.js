import { render } from "@testing-library/react";
import withRouter from '../utility/withRouter';
import { Grid, Hidden } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Upcoming } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import MapDisplay from './Google-Maps/mapDisplay';
import Calendar from './Calendar';
import ClubDetailPage from "./ClubDetailPage";
import GeoCoding from "./Google-Maps/GeoCoding"
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function HomePage (){
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
            <Item> <MapDisplay /></Item>
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
