import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
function Dashboard() {
  const [rewards, setRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    fetch('https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60')
      .then(response => response.json())
      .then(data => {
        setRewards(data);
        const total = data.reduce((acc, reward) => acc + reward.rewardPoints, 0);
        setTotalRewards(total);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg">Total Rewards: {totalRewards}</p>
      <ul>
        {rewards.map(reward => (
          <li key={reward.id}>
            <Link to={`/reward/${reward.id}`}>
                {reward.id} {reward.brand} - {reward.rewardPoints} rewardPoints
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
