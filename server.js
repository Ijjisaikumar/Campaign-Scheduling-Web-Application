const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Dummy database for campaigns (this should be replaced by a real database in a production app)
let campaigns = [];

// Get all campaigns
app.get('/campaigns', (req, res) => {
  res.json(campaigns);
});

// Create a new campaign
app.post('/campaigns', (req, res) => {
  const { type, startDate, endDate, schedule } = req.body;

  if (!type || !startDate || !endDate || !schedule) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newCampaign = {
    id: campaigns.length + 1,
    type,
    startDate,
    endDate,
    schedule,
  };

  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Update an existing campaign
app.put('/campaigns/:id', (req, res) => {
  const { id } = req.params;
  const { type, startDate, endDate, schedule } = req.body;

  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === parseInt(id));
  if (campaignIndex === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns[campaignIndex] = { id: parseInt(id), type, startDate, endDate, schedule };
  res.json(campaigns[campaignIndex]);
});

// Delete a campaign
app.delete('/campaigns/:id', (req, res) => {
  const { id } = req.params;

  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === parseInt(id));
  if (campaignIndex === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns.splice(campaignIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
