import React, { useState, useEffect } from "react";
import DonationTokenContract from "./contracts/DonationToken.json";
import getWeb3 from "./getWeb3";
import "./App.css";

function DonationApp() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    initializeWeb3();
    initializeContract();
  }, []);

  const initializeWeb3 = async () => {
    try {
      const web3Instance = await getWeb3();
      const accs = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccounts(accs);
    } catch (error) {
      console.error("Error initializing web3:", error);
    }
  };

  const initializeContract = async () => {
    try {
      const web3Instance = await getWeb3();
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = DonationTokenContract.networks[networkId];
      const instance = new web3Instance.eth.Contract(
        DonationTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  };

  const handleDonate = async () => {
    if (!value || isNaN(value) || Number(value) <= 0) {
      setStatus("Invalid value");
      return;
    }

    try {
      const amount = web3.utils.toWei(value.toString(), "ether");
      const date = Math.floor(Date.now() / 1000); // current timestamp in seconds
      const message = "Thank you for Donating using SMARTDEEDS"; // replace with the actual message

      // Set the address of the deployed contract
      contract.options.address = "0x2c91547aD4f942e35E8D3253835516Bf0A2C09Ff"; // Replace with your actual contract address

      await contract.methods
        .donate(receiver, amount, date)
        .send({ from: accounts[0] })
        .on("receipt", function (donationReceipt) {
          console.log(
            "Donation successful. Transaction receipt:",
            donationReceipt
          );
          setStatus("Donation successful");
        })
        .on("error", function (error) {
          console.error("Error occurred during donation:", error);
          setStatus("Error donating");
        });
    } catch (error) {
      console.error("Error donating:", error);
      setStatus("Error donating");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Donation App</h1>
      <div>
        <label className="receiver">Receiver:</label>
        <input
          className="box1"
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
      <div>
        <label className="value">Value:</label>
        <input
          className="box2"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleDonate}>
        Donate
      </button>
      <p className="status">Status: {status}</p>
    </div>
  );
}

export default DonationApp;
