const DonationToken = artifacts.require("DonationToken");

contract("DonationToken", (accounts) => {
  const owner = accounts[0];
  const recipient = accounts[1];
  const donor1 = accounts[2];
  const donor2 = accounts[3];

  let tokenInstance;

  beforeEach(async () => {
    tokenInstance = await DonationToken.new("Donation Token", "DON");
  });

  it("should allow owner to mint tokens", async () => {
    const amount = 100;
    await tokenInstance.mint(owner, amount);
    const balance = await tokenInstance.balanceOf(owner);
    assert.equal(balance, amount);
  });

  it("should not allow non-owner to mint tokens", async () => {
    const amount = 100;
    try {
      await tokenInstance.mint(recipient, amount, { from: recipient });
      assert.fail("Expected an error, but none was thrown");
    } catch (error) {
      assert.include(
        error.message,
        "Only the owner can call this function.",
        "Expected an error message containing 'Only the owner can call this function.'"
      );
    }
  });

  it("should allow transfer of tokens between accounts", async () => {
    const amount = 100;
    await tokenInstance.mint(owner, amount);
    await tokenInstance.transfer(recipient, amount);
    const balanceOwner = await tokenInstance.balanceOf(owner);
    const balanceRecipient = await tokenInstance.balanceOf(recipient);
    assert.equal(balanceOwner, 0);
    assert.equal(balanceRecipient, amount);
  });
});
