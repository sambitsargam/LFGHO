import "./App.css";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { TopNav } from "./Components/TopNav";
import { DonationForm } from "./Components/DonationForm";
import { CoffeesData } from "./Components/CoffeesData";
import { BasicInfo } from "./Components/BasicInfo";
import { createConfig } from "wagmi";
import { getDefaultWallets } from "connectkit";
import { polygonMumbai } from "wagmi/chains";
const chains = [polygonMumbai];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    chains,

    // Required
    appName: "CryptoCoffeeCart",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);


function App() {
  return (    
  <WagmiConfig config={config}>
    <ConnectKitProvider>
        <TopNav />
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 sm:row-span-16">
            <DonationForm />
          </div>
          <div className="col-span-1">
            <BasicInfo/>
          </div>
          <div className="row-span-2 col-span-1">
            <CoffeesData />
          </div>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
