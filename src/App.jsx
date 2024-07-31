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
          {/* You can add more routes here for other components or pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
