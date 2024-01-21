/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Coffee from "../artifacts/contracts/Coffee.sol/Coffee.json";
import Swal from "sweetalert2";

export const DonationForm = () => {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const buyCoffee = async () => {
    setIsLoading(true);
    if (!amount || !name || !message) {
      if (amount < 0.1) {
        alert("please enter amount greater that 0.1");
        setIsLoading(false);
        return;
      }
      alert("please fill all the fields");
      setIsLoading(false);
      return;
    }
    const MATICAmount = ethers.utils.parseUnits(amount, "ether");
    console.log(MATICAmount);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        Coffee.abi,
        signer
      );
      const tx = await contract.buyCoffee(name, message, {
        value: MATICAmount,
      });
      await tx.wait();
      Swal.fire({
        icon: "success",
        title: "Donated successfully",
        html: `<a href="https://mumbai.polygonscan.com/tx/${tx.hash}">View on explorer</a>`,
      }).then(window.location.reload(false));
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "success",
        title: "Donated successfully",
        html: `Something went wrong`,
      })
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-200 "
              src="coffee.png"
              alt="Workflow"
              width={100}
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Donate to Sambit
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Your Name
                </label>
                <input
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Your Message
                </label>
                <input
                  type="text"
                  autoComplete="current-message"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Message in one line"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="amount" className="sr-only">
                  Amount in MATIC
                </label>
                <input
                  type="number"
                  autoComplete="amount"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Amount (In MATIC)"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              {isConnected ? (
                <button
                  onClick={buyCoffee}
                  disabled={isLoading}
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? "Loading..." : "Donate"}
                </button>
              ) : (
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
