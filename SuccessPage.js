import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaignData } = location.state || {}; // Extract campaign data passed from the previous page
  
  if (!campaignData) {
    return <Typography variant="h5" align="center">No campaign data found!</Typography>;
  }

  const { type, startDate, endDate, schedule } = campaignData;

  const handleBack = () => {
    navigate('/');  // Redirect back to the campaign list
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Campaign Created/Updated Successfully!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Campaign Type:</strong> {type}</Typography>
            <Typography variant="body1"><strong>Start Date:</strong> {startDate}</Typography>
            <Typography variant="body1"><strong>End Date:</strong> {endDate}</Typography>
            <Typography variant="body1"><strong>Schedule:</strong></Typography>
            {schedule.map((slot, index) => (
              <Typography variant="body2" key={index}>
                {slot.day}: {slot.start} to {slot.end}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={handleBack} fullWidth sx={{ mt: 2 }}>
          Back to Campaign List
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
