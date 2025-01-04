import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Container, CardActions } from '@mui/material';
import { getCampaigns, deleteCampaign } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []); // Empty dependency array to fetch only once when the component mounts

  const handleDelete = async (id) => {
    await deleteCampaign(id);
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const handleEdit = (campaign) => {
    navigate('/create', { state: { campaign } }); // Navigate to the create/edit form with the campaign data
  };

  // Function to get the next scheduled activation based on the current date and time
  const getNextActivation = (schedule) => {
    const now = new Date();
    const upcomingSchedules = schedule
      .map((slot) => {
        const [startHour, startMinute] = slot.start.split(':');
        const startTime = new Date(now);
        startTime.setHours(startHour, startMinute, 0, 0);
        if (startTime > now) {
          return { day: slot.day, time: startTime };
        }
        return null;
      })
      .filter(Boolean); // Filter out null values
    if (upcomingSchedules.length > 0) {
      return upcomingSchedules[0].time.toLocaleString(); // Return the first upcoming scheduled time
    }
    return 'No upcoming activation';
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Campaign Scheduler
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create')} // Redirect to create campaign form
            fullWidth
          >
            Create New Campaign
          </Button>
        </Grid>

        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6">{campaign.type}</Typography>
                <Typography color="textSecondary">
                  {campaign.startDate} to {campaign.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next activation: {getNextActivation(campaign.schedule)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(campaign)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(campaign.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CampaignList;
