import { Box, Container, Grid, Tab } from '@mui/material';
import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthProvider';
import { Link } from 'react-router-dom';




export default function Footer() {
  const { IsSignIn, SignOut } = useContext(AuthContext);
  return (

    <Box
      bgcolor="text.primary"
      color="white"
      sx={{
        width: "100%",
        marginTop: "100px"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Account</Box>
            {!IsSignIn&&<Box>
              <Tab label={"Login"} to={"login"} component={Link} sx={{ color: '#fff' }} />
            </Box>} 
            {IsSignIn&&<Box>
              <Tab label={"Logout"}  onClick={
               ()=>SignOut()
              } sx={{ color: '#fff' }} />
            </Box> } 
            {!IsSignIn&&<Box>
              <Tab label={"Register"} to={"register"} component={Link} sx={{ color: '#fff' }} />
            </Box>}
            
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>cipherbizz</Box>
            <Box>
              <Tab label={"Home"} to={"/"} component={Link} sx={{ color: '#fff' }} />
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          cipherbizz 2023 &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  )
}
