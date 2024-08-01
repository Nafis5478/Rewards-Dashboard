import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bar, setbar] = useState(1);
  const handleInputChange = (key, value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [key]: value,
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };
  const manageBars = () => {
    if (bar === 0) {
      setbar(1);
    } else {
      setbar(0);
    }
  };
  return (
    <div
      className={`${
        bar === 1 ? "h-16" : "h-full"
      } mb-4 flex flex-col lg:flex-row bg-amber-300 gap-3 lg:gap-6 lg:justify-center pt-4 lg:items-center lg:h-full`}
    >
      <div className="flex flex-row lg:flex-col justify-between lg:justify-normal px-2 items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="text-2xl font-bold align-middle lg:align-top flex flex-row lg:flex-col gap-2 lg:gap-0 lg:items-center lg:mb-4">
              <p>Rewards</p>
              <p>Dashboard</p>
            </h1>
          </Link>
        </div>
        <div
          className={`${
            bar === 1 ? "block" : "hidden"
          } lg:hidden text-3xl flex items-center`}
          onClick={manageBars}
        >
          <FaBars />
        </div>
        <div
          className={`${
            bar === 1 ? "hidden" : "block"
          } lg:hidden text-3xl flex items-center`}
          onClick={manageBars}
        >
          <FaRegWindowClose />
        </div>
      </div>

      {/* search bar */}
      <div className={`${bar === 1 ? "hidden" : "block"} lg:block lg:mb-4`}>
        <label className="block mb-1 text-sm px-2 font-semibold lg:hidden">
          Search Brands:
        </label>
        <input
          type="text"
          value={searchParams.get("brand") || ""}
          placeholder="Search Brands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128269;"
          onChange={(e) => handleInputChange("brand", e.target.value)}
          className=" lg:block border p-2 w-48 lg:w-full rounded-lg bg-amber-50 ml-16 lg:ml-0"
        />
      </div>
      {/* date range filter */}
      <div
        className={`${
          bar === 1 ? "hidden" : "block"
        } lg:flex gap-2 lg:gap-0 lg:flex-row lg:mb-4`}
      >
        <div className="flex flex-row mb-2 lg:mb-0">
          <label className="block mb-2 text-sm px-2 font-semibold">
            Start date:
          </label>
          <input
            type="date"
            value={searchParams.get("from") || ""}
            onChange={(e) => handleInputChange("from", e.target.value)}
            className="border p-2 mr-2 rounded-lg text-gray-500 bg-amber-50"
          />
        </div>
        <div className="flex flex-row">
          <label className="block mb-2 text-sm px-2 font-semibold">
            End date: <span className="lg:hidden">&nbsp;</span>
          </label>
          <input
            type="date"
            value={searchParams.get("to") || ""}
            onChange={(e) => handleInputChange("to", e.target.value)}
            className="border p-2 rounded-lg text-gray-500 bg-amber-50"
          />
        </div>
      </div>

      {/* sorting feature */}
      <div
        className={`${
          bar === 1 ? "hidden" : "block"
        } lg:mb-4 lg:flex flex-col  lg:flex-row`}
      >
        <label className="block lg:mb-2 text-sm px-2 font-semibold">
          Sort by:
        </label>
        <select
          value={searchParams.get("sortKey") || "purchaseDate"}
          onChange={(e) => handleInputChange("sortKey", e.target.value)}
          className="border p-2 lg:mr-2 rounded-lg text-gray-500 bg-amber-50 w-48 ml-16 lg:ml-0 mb-2 lg:mb-0"
        >
          <option value="purchaseDate">Purchase Date</option>
          <option value="rewardPoints">Reward Points</option>
        </select>
        <select
          value={searchParams.get("sortOrder") || "asc"}
          onChange={(e) => handleInputChange("sortOrder", e.target.value)}
          className="border p-2 rounded-lg text-gray-500 bg-amber-50 w-48 ml-16 lg:ml-0"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* clear button */}
      <div className={`${bar === 1 ? "hidden" : "block"} lg:block mb-4`}>
        <button
          onClick={clearFilters}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-300 hover:text-black font-semibold hover:border-black hover:scale-95 hover:border-2 duration-500 ml-5 lg:ml-0"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Navbar;
