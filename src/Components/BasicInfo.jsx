import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Coffee from "../artifacts/contracts/Coffee.sol/Coffee.json";

export const BasicInfo = () => {
  const [total, setTotal] = useState();
  const [address, setAddress] = useState();
  const [singleDonation, setSingleDonation] = useState();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getFunds = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://rpc-mumbai.maticvigil.com/`
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      Coffee.abi,
      provider
    );
    const coffees = await contract.getCoffees();
    const result = coffees.reduce(
      (total, currentValue) =>
        (total =
          total + +ethers.utils.formatEther(currentValue.amount.toString())),
      0
    );
    setTotal(result);
  };
  useEffect(() => {
    const interval = setInterval(() => getFunds(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getUserDonation = async () => {
    setIsLoading(true);
    if (address) {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://rpc-mumbai.maticvigil.com`
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        Coffee.abi,
        provider
      );
      try {
        const coffee = await contract.getDonation(address);
        const coffeeAmount = ethers.utils.formatEther(coffee.amount.toString());
        setName(coffee.name);
        setSingleDonation(coffeeAmount);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="flex items-center justify-start pt-10 pb-3">
        <h2 style={{ fontSize: "26px" }}>Total Donation Yet : {total ? total : 'Fetching...'} MATIC</h2>
      </div>
      <div className="">
        <label htmlFor="message">Get Donation Data For Address</label>
        <div className="flex items-center justify-start">
          <input
            name="message"
            className="appearance-none relative block w-50 px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            defaultValue="0xA12..."
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={getUserDonation}
            disabled={isLoading}
            className="group relative w-40 flex justify-center py-2 px-4 mx-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Loading..." : "Get For Address"}
          </button>
        </div>
        <div>
          <h2>
            {singleDonation
              ? `${name} has donated ${singleDonation} MATIC`
              : "No donation for this address"}
          </h2>
        </div>
      </div>
    </>
  );
};
