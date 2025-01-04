import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="/create" element={<CampaignForm />} />
        <Route path="/edit" element={<CampaignForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
