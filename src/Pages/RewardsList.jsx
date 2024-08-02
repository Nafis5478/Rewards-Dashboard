import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchRewards, calculateTotalPoints } from "../redux/rewardsSlice";

function RewardsList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rewards, loading, error } = useSelector((state) => state.rewards);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);

  useEffect(() => {
    if (rewards.length === 0) {
      dispatch(fetchRewards());
    }
  }, [dispatch, rewards.length]);

  useEffect(() => {
    let data = [...rewards];

    const brand = searchParams.get("brand") || "";
    if (brand) {
      data = data.filter((item) =>
        item.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      data = data.filter((item) => {
        const purchaseDate = new Date(item.purchaseDate);
        return purchaseDate >= fromDate && purchaseDate <= toDate;
      });
    }

    const sortKey = searchParams.get("sortKey") || "purchaseDate";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    data = data.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

    setFilteredRewards(data);

    // Calculate total reward points using the global function
    const totalPoints = calculateTotalPoints(data);
    setTotalRewardPoints(totalPoints);
  }, [rewards, searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl lg:bg-orange-100 lg:hover:cursor-pointer font-bold lg:font-semibold lg:fixed lg:bottom-3 lg:right-3 flex flex-row lg:flex-col lg:justify-center items-center lg:border-2 lg:border-black rounded-md p-2 gap-1.5 lg:gap-0">
          <div>Total Rewards:</div>
          <div>{totalRewardPoints}</div>
        </h2>
      </div>
      <div className="flex flex-row justify-center mx-28 lg:mx-44 ">
        <table className="min-w-full bg-white border-spacing-y-8 ">
          <thead>
            <tr>
              <th className="py-4 px-4 bg-slate-200 text-left">Brand Name</th>
              <th className="py-4 px-4 bg-slate-200 text-left">
                Purchase Date
              </th>
              <th className="py-4 px-4 bg-slate-200 text-left">Points</th>
            </tr>
          </thead>

          <tbody>
            {filteredRewards.map((reward) => (
              <tr
                key={reward.id}
                className="hover:bg-slate-200 duration-500 cursor-pointer"
                onClick={() => navigate(`/reward/${reward.id}`)}
              >
                <td className="py-4 pl-8">{reward.brand}</td>
                <td className="py-4 px-4">{reward.purchaseDate}</td>
                <td className="py-4 px-4">{reward.rewardPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RewardsList;
