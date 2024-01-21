/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { ConnectKitButton } from "connectkit";


export const TopNav = () => {
  return (
    <>
      <nav style={{background: '#000'}} className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <a
            href="/home"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            <img src="logo.png" width={'100'}/>
          </a>
        </div>
        <div style={{margin: "auto 0"}}>
          <ConnectKitButton/>
        </div>
        <div style={{ margin: "auto 0" }}>
          <button className="text-md no-underline text-white hover:text-blue-dark"> <a href="https://mumbai.polygonscan.com/address/0x37cf534739a74a2f90a9df9a092afbb80f2e4cb6">Verified Contract on Polygonscan </a></button>
        </div>
      </nav>
    </>
  );
};
