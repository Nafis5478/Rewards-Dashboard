import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { fetchRewards } from "../redux/rewardsSlice";

function RewardDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rewards, loading, error } = useSelector((state) => state.rewards);

  useEffect(() => {
    if (rewards.length === 0) {
      dispatch(fetchRewards());
    }
  }, [dispatch, rewards.length]);

  const reward = rewards.find((item) => item.id.toString() === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reward) return <p>Reward not found!</p>;

  const formattedDate = new Date(reward.purchaseDate).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="flex items-center justify-center lg:mt-20 mx-2 text-xl">
      <div className="border-2 border-black flex flex-col py-5 bg-amber-100 justify-center items-center w-96">
        <h1 className="text-2xl font-bold text-center mb-5">Reward Details</h1>
        <span className="font-semibold text-center underline">
          Here is the details of your reward
        </span>
        <div className="flex flex-row justify-between lg:gap-32">
          <div className="font-semibold text-justify">Brand Name:</div>
          <div className="">{reward.brand}</div>
        </div>
        <div className="flex flex-row justify-between lg:gap-9">
          <div className="font-semibold">Purchase Date:</div>
          <div className="">{formattedDate}</div>
        </div>
        <div className="flex flex-row justify-between lg:gap-36">
          <div className="font-semibold">Reward Points:</div>
          <div className="">{reward.rewardPoints}</div>
        </div>
        <Link to="/">
          <div className="flex flex-row gap-2 justify-center items-center mt-5 text-blue-600 font-semibold underline duration-500">
            <div>Back home</div>
            <div>
              <IoHome />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default RewardDetails;
