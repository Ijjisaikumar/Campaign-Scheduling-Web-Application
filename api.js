import axios from 'axios';

const apiUrl = 'http://localhost:5000/campaigns';

// Get all campaigns
export const getCampaigns = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(apiUrl, campaignData);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

// Update an existing campaign
export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, campaignData);
    return response.data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

// Delete a campaign
export const deleteCampaign = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};
