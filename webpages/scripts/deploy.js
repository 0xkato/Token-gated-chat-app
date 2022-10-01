const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('Mint');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.mintNewChatPass(1, "0xkato", 11)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #1")

  // Mint another NFT for fun.
  txn = await nftContract.mintNewChatPass(2, "0xkato", 12)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #2")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();