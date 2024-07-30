import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function rewardDetails() {
  const { id } = useParams();
  const [reward, setReward] = useState(null);

  useEffect(() => {
    fetch('https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60')
      .then(response => response.json())
      .then(data => {
        const foundReward = data.find(item => item.id.toString() === id);
        setReward(foundReward);
      });
  }, [id]);

  if (!reward) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Reward Details</h1>
      <p>Brand: {reward.brand}</p>
      <p>Date: {reward.purchaseDate}</p>
      <p>Points: {reward.rewardPoints}</p>
    </div>
  );
}

export default rewardDetails;
