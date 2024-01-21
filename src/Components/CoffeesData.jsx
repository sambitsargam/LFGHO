/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Coffee from "../artifacts/contracts/Coffee.sol/Coffee.json";
import { ethers } from "ethers";

export const CoffeesData = () => {
  const [data, setData] = useState([]);
  const divStyle = {
    background: "#5046e5",
    color: "#fff",
    borderRadius: "12px",
    margin: "10px 10px 0 0",
  };

  const getData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://rpc-mumbai.maticvigil.com/`
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      Coffee.abi,
      provider
    );
    const coffees = await contract.getCoffees();
    setData(coffees);
  };

  useEffect(() => {
    const interval = setInterval(() => getData(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="pt-4 border-t-2">
        <h2 className="" style={{ fontSize: "20px" }}>
          <strong>Some Recent Donations :</strong>
        </h2>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-start">
              <strong>Name</strong>
            </div>
            <div className="flex items-center justify-center">
              <strong>Message</strong>
            </div>
            <div className="flex items-center justify-end">
              <strong>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" width={80} />
              </strong>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {data.length < 1 ? <p className="mt-10">Please Wait Loading Data...</p> : ""}
        </div>
        {[...data]
          .slice(0, 5)
          .reverse()
          .map((items, i) =>
            items.name !== "" ? (
              <div key={i} className="p-4" style={divStyle}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-start">
                    {items.name}
                  </div>
                  <div className="flex items-center justify-center">
                    {items.message}
                  </div>
                  <div className="flex items-center justify-end">
                    {ethers.utils.formatEther(items.amount.toString())} MATIC
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </>
  );
};
