import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import RewardsList from './Pages/RewardsList.jsx';
// import RewardDetails from './components/RewardDetails';
import RewardDetails from './Pages/RewardsDetails.jsx'

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rewards" element={<RewardsList />} />
          <Route path="/reward/:id" element={<RewardDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
