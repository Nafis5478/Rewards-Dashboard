import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
function rewardDetails() {
  const { id } = useParams();
  const [reward, setReward] = useState(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/68f88502-a805-4d24-a407-ee2a232a5c60")
      .then((response) => response.json())
      .then((data) => {
        const foundReward = data.find((item) => item.id.toString() === id);
        setReward(foundReward);
      });
  }, [id]);

  if (!reward) {
    return <p>Loading...</p>;
  }

  // Format the purchase date
  const formattedDate = new Date(reward.purchaseDate).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-center lg:mt-20 mx-2 text-xl">
      <div className="border-2 border-black flex flex-col py-5 bg-amber-100 justify-center items-center w-96">
        <h1 className="text-2xl font-bold text-center mb-5">Reward Details</h1>
        <span className="font-semibold text-center underline">Here is the details of your reward</span>
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
          <Link to={'/'}>
        <div className="flex flex-row gap-2 justify-center items-center mt-5 text-blue-600 font-semibold underline duration-500">
            <div className="">
              Back home 
            </div>
            <div className="">
              <IoHome />
            </div>
        </div>
          </Link>
      </div>
    </div>
  );
}

export default rewardDetails;
