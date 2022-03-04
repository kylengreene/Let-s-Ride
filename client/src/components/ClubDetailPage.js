import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useParams} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withRouter from '../utility/withRouter';
import {findClubById} from "../api/club"
import AuthContext from '../context/AuthContext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ClubDetailPage (props) {
    const router = {...props}

    const theme = createTheme();

    const {id} = useParams();

    const authContext = React.useContext(AuthContext);

    const [club, setClub] = React.useState(null);

    const handleErr = React.useCallback(err => {
      if (err === 403) {
        authContext.logout();
        err = "Unauthorized";
      }
    }, [authContext]);

    React.useEffect(() => {
      const fetchClub = async () => {
        const response = await findClubById(id);
        setClub(response);
      }
      fetchClub();
    }, [id, handleErr]);


    if (!club) {
      return <h5>loading</h5>
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5" sx={{ border:1, p:2}}>
            {club.clubName}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}  sx={{ mt:16 }}>
                <Grid item xs={4}>
                    Description:
                </Grid>
                <Grid item xs={8}>
                    <Item> {club.clubDescription} </Item>
                </Grid>
                <Grid item xs={4}>
                    City:
                </Grid>
                <Grid item xs={8}>
                    <Item>{club.clubCity.short_name}</Item>
                </Grid>
                <Grid item xs={4}>
                    State:
                </Grid>
                <Grid item xs={8}>
                    <Item>{club.clubState.short_name}</Item>
                </Grid>
                <Grid item xs={4}>
                    Street:
                </Grid>
                <Grid item xs={8}>
                    <Item>{club.clubPostalCode.short_name}</Item>
                </Grid>
                <Grid xs={2}>
                    {
                      authContext.credentials === undefined ? null :
                      authContext.credentials.authorities.filter(a => a === `ROLE_ADMIN_${id}`).length > 0 ?
                      <Button
                      onClick={() => router.router.navigate(`/clubs/${id}/admin`)}
                      id="clubPageBtn"
                      fullWidth
                      variant="contained"
                      >
                          Admin
                      </Button> : null
                    }
                </Grid>
            </Grid>

        </Box>
        </Box>
        </Container>
        </ThemeProvider>
    );
}
export default withRouter(ClubDetailPage);
