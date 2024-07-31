import React from "react";
import { useSearchParams } from "react-router-dom";

function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (key, value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [key]: value,
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 flex flex-row bg-gray-200 gap-16 justify-center pt-4 items-center ">
      <h1 className="text-2xl font-bold mb-4 items-center flex flex-col">
        <p>Rewards</p>
        <p>Dashboard</p>
      </h1>
      {/* search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchParams.get("brand") || ""}
          placeholder="Search Brands"
          onChange={(e) => handleInputChange("brand", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>
      {/* date range filter */}
      <div className="mb-4 flex flex-row">
        <div className="flex flex-row">
          <label className="block mb-2 text-sm px-2">Start date:</label>
          <input
            type="date"
            value={searchParams.get("from") || ""}
            //   placeholder='Start Date'
            onChange={(e) => handleInputChange("from", e.target.value)}
            className="border p-2 mr-2 rounded-lg"
          />
        </div>
        <div className="flex flex-row">
          <label className="block mb-2 text-sm px-2">End date:</label>
          <input
            type="date"
            value={searchParams.get("to") || ""}
            //   placeholder='End Date'
            onChange={(e) => handleInputChange("to", e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
      </div>
      {/* sorting feature */}
      <div className="mb-4 flex flex-row">
        <label className="block mb-2 text-sm px-2">Sort by:</label>
        <select
          value={searchParams.get("sortKey") || "purchaseDate"}
          onChange={(e) => handleInputChange("sortKey", e.target.value)}
          className="border p-2 mr-2 rounded-lg"
        >
          <option value="purchaseDate">Purchase Date</option>
          <option value="rewardPoints">Reward Points</option>
        </select>
        <select
          value={searchParams.get("sortOrder") || "asc"}
          onChange={(e) => handleInputChange("sortOrder", e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* clear button */}
      <div className="mb-4">
        <button
          onClick={clearFilters}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500 duration-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Navbar;
