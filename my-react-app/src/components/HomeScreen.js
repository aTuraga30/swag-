import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

const HomeScreen = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>Check-in Page</Typography>
        <Box mb={3}>
          <Button variant="contained" color="primary" component={Link} to="/check-in">Check in</Button>
        </Box>
        <Box mb={3}>
          <TextField
            label="Are you new here?"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button variant="contained" color="secondary" component={Link} to="/get-started">Get started</Button>
      </Box>
    </Container>
  );
};

export default HomeScreen;
