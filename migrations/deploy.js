const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);
//account address not Primary key
const tester = "0xa4bA378eBe291F6FBe647d3f56B3221Ba50685d9";

const abi = JSON.parse(
  fs.readFileSync("DonationToken_sol_DonationToken.abi", "utf-8")
);
const bytecode = fs.readFileSync(
  "DonationToken_sol_DonationToken.bin",
  "utf-8"
);
const contract = new web3.eth.Contract(abi);

const deployParams = {
  data: "0x" + bytecode,
  arguments: ["Donation Token", "DON"],
};

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
console.log(process.env.PRIVATE_KEY.length);
const options = {
  from: tester,
  gas: 3000000,
  gasPrice: web3.utils.toWei("20", "gwei"),
};

contract
  .deploy(deployParams)
  .send(options)
  .on("receipt", function (receipt) {
    console.log("Contract deployed at:", receipt.contractAddress);
    // Set the address of the deployed contract
    contract.options.address = receipt.contractAddress;

    // Call the donate function after deployment
    contract.methods
      .donate(receiver, value)
      .send(options)
      .on("receipt", function (donationReceipt) {
        console.log(
          "Donation successful. Transaction receipt:",
          donationReceipt
        );
      })
      .on("error", function (error) {
        console.error("Error occurred during donation:", error);
      });
  });
