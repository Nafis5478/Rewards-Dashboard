import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RewardsList() {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch('https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60')
      .then(response => response.json())
      .then(data => setRewards(data));
  }, []);

  useEffect(() => {
    let data = [...rewards];

    // Apply brand filter
    const brand = searchParams.get('brand') || '';
    if (brand) {
      data = data.filter(item => item.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    // Apply date range filter
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      data = data.filter(item => {
        const purchaseDate = new Date(item.purchaseDate);
        return purchaseDate >= fromDate && purchaseDate <= toDate;
      });
    }

    // Apply sorting
    const sortKey = searchParams.get('sortKey') || 'purchaseDate';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    data = data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

    setFilteredRewards(data);

    // Calculate total reward points
    const totalPoints = data.reduce((acc, curr) => acc + curr.rewardPoints, 0);
    setTotalRewardPoints(totalPoints);
  }, [rewards, searchParams]);

  return (
    <div>
      
      


      <div className="mb-4">
        <h2 className="text-xl font-semibold">Total Reward Points: {totalRewardPoints}</h2>
      </div>

      <ul className="list-disc pl-5">
        {filteredRewards.map(reward => (
          <li key={reward.id} className="mb-2">
            <Link to={`/reward/${reward.id}`}>
              {reward.brand} - {reward.purchaseDate} - {reward.rewardPoints} points
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RewardsList;
