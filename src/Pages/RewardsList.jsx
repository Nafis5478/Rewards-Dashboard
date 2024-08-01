import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RewardsList() {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60")
      .then((response) => response.json())
      .then((data) => setRewards(data));
  }, []);

  useEffect(() => {
    let data = [...rewards];

    // Apply brand filter
    const brand = searchParams.get("brand") || "";
    if (brand) {
      data = data.filter((item) =>
        item.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    // Apply date range filter
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

    // Apply sorting
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

    // Calculate total reward points
    const totalPoints = data.reduce((acc, curr) => acc + curr.rewardPoints, 0);
    setTotalRewardPoints(totalPoints);
  }, [rewards, searchParams]);

  return (
    <div>
      <div className="lg:hidden font-bold mb-3 ml-2">
        Total Rewards earned: {totalRewardPoints}
      </div>
      <div className="flex flex-row justify-center mx-28 lg:mx-44 ">
        <table className="min-w-full bg-white border-spacing-y-8 ">
          <thead>
            <tr>
              <th className="py-4 px-4 bg-slate-200 text-left">Brand Name</th>
              <th className="py-4 px-4 bg-slate-200 text-left">Purchase Date</th>
              <th className="py-4 px-4 bg-slate-200 text-left">Points</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredRewards.map((reward) => (
              <tr key={reward.id} className=" hover:bg-slate-200 duration-500 ">
                <td className="py-4 pl-8">
                <Link to={`/reward/${reward.id}`} className="block w-full h-full">
                  {reward.brand}
                </Link>
                </td>
                <td className="py-4 px-4">
                <Link to={`/reward/${reward.id}`} className="block w-full h-full">
                  {reward.purchaseDate}
                </Link>
                </td>
                <td className="py-4 px-4">
                <Link to={`/reward/${reward.id}`} className="block w-full h-full">
                  {reward.rewardPoints}
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4 hidden lg:block">
        <h2 className="text-xl bg-orange-100 hover:cursor-pointer font-semibold fixed bottom-3 right-3 flex flex-col justify-center items-center border-2 border-black rounded-md p-2">
          <div>
            
          Total Rewards:
          </div>
          <div>

          {totalRewardPoints}
          </div>
        </h2>
      </div>
    </div>
  );
}

export default RewardsList;
