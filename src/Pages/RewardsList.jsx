import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function RewardsList() {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [rewards, searchParams]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rewards Dashboard</h1>

      <div className="mb-4">
        <label className="block mb-2">Filter by Brand:</label>
        <input
          type="text"
          value={searchParams.get('brand') || ''}
          onChange={e => setSearchParams({ ...Object.fromEntries(searchParams.entries()), brand: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Filter by Date Range:</label>
        <input
          type="date"
          value={searchParams.get('from') || ''}
          onChange={e => setSearchParams({ ...Object.fromEntries(searchParams.entries()), from: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={searchParams.get('to') || ''}
          onChange={e => setSearchParams({ ...Object.fromEntries(searchParams.entries()), to: e.target.value })}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Sort by:</label>
        <select
          value={searchParams.get('sortKey') || 'purchaseDate'}
          onChange={e => setSearchParams({ ...Object.fromEntries(searchParams.entries()), sortKey: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="purchaseDate">Purchase Date</option>
          <option value="rewardPoints">Reward Points</option>
        </select>
        <select
          value={searchParams.get('sortOrder') || 'asc'}
          onChange={e => setSearchParams({ ...Object.fromEntries(searchParams.entries()), sortOrder: e.target.value })}
          className="border p-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
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

// export default RewardsList;
