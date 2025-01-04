import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { createCampaign, updateCampaign } from '../api';

const CampaignForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignData = location.state?.campaignData; // For editing an existing campaign

  const [type, setType] = useState(campaignData ? campaignData.type : ''); // Default to campaign's type when editing
  const [startDate, setStartDate] = useState(campaignData ? campaignData.startDate : '');
  const [endDate, setEndDate] = useState(campaignData ? campaignData.endDate : '');
  const [schedule, setSchedule] = useState(campaignData ? campaignData.schedule : [{ day: 'Monday', start: '', end: '' }]);
  const [error, setError] = useState('');

  const handleTypeChange = (event) => setType(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: 'Monday', start: '', end: '' }]);
  };

  const handleRemoveSchedule = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
  };

  const handleSubmit = async () => {
    if (!type || !startDate || !endDate || schedule.some(s => !s.start || !s.end)) {
      setError('All fields must be filled out!');
      return;
    }

    const campaignDetails = {
      type,
      startDate,
      endDate,
      schedule,
    };

    try {
      if (campaignData) {
        await updateCampaign(campaignData.id, campaignDetails); // Edit an existing campaign
      } else {
        await createCampaign(campaignDetails); // Create a new campaign
      }
      navigate('/success', { state: { campaignData: campaignDetails } }); // Redirect to SuccessPage
    } catch (err) {
      setError('An error occurred while saving the campaign');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {campaignData ? 'Edit Campaign' : 'Create New Campaign'}
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Campaign Type</InputLabel>
        <Select value={type} onChange={handleTypeChange} label="Campaign Type">
          <MenuItem value="Cost per Order">Cost per Order</MenuItem>
          <MenuItem value="Cost per Click">Cost per Click</MenuItem>
          <MenuItem value="Buy One Get One">Buy One Get One</MenuItem>
        </Select>
        {error && !type && <FormHelperText error>Campaign type is required</FormHelperText>}
      </FormControl>

      <TextField
        label="Start Date"
        type="date"
        fullWidth
        margin="normal"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={error && !startDate}
      />
      
      <TextField
        label="End Date"
        type="date"
        fullWidth
        margin="normal"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={error && !endDate}
      />

      {schedule.map((slot, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="Day"
              value={slot.day}
              onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={slot.start}
              onChange={(e) => handleScheduleChange(index, 'start', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={slot.end}
              onChange={(e) => handleScheduleChange(index, 'end', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="error" onClick={() => handleRemoveSchedule(index)}>
              Remove Schedule
            </Button>
          </Grid>
        </Grid>
      ))}

      <Button onClick={handleAddSchedule} variant="outlined" color="primary" sx={{ mt: 2 }}>
        Add New Schedule
      </Button>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {campaignData ? 'Save Changes' : 'Create Campaign'}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default CampaignForm;
