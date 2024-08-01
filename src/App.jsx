import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RewardsList from './Pages/RewardsList.jsx'
import Navbar from './Components/Navbar.jsx';
import RewardDetails from './Pages/RewardsDetails.jsx';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<RewardsList />} />
          <Route path="/reward/:id" element={<RewardDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
