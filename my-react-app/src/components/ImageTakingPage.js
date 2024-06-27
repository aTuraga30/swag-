import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const ImageTakingPage = () => {
  const location = useLocation();
  const { name, email, age } = location.state || {};

  const handleStartClick = async () => {
    const data = { name, email, age };

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Registration successful');
      } else {
        // Handle errors
        console.error('Error during registration');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>Take Picture</Typography>
        <Typography variant="body1" mb={3}>
          Take picture to finish getting registered
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartClick}
        >
          Start
        </Button>
      </Box>
    </Container>
  );
};

export default ImageTakingPage;
