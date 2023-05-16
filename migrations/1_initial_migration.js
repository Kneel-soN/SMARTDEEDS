const Migrations = artifacts.require("Migrations");
const DonationToken = artifacts.require("DonationToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(DonationToken, "Donation Token", "DON");
};
