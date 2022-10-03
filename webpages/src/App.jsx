import logo from './imgs/jojo.jpeg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import mintNFT from "./utils/Mint.json";
import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
import './App.css';

function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [EnsName, setEnsName] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    useEffect(() => {
      const { ethereum } = window; 
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        sethaveMetamask(true);
      };
      checkMetamaskAvailability();
    }, []);
    
    // connect wallet
    const connectWallet = async () => {
      try {
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
  
        const accounts = await ethereum.request({ method: 'eth_requestAccounts', });

        setCurrentAccount(accounts[0]); 

        var name = await provider.lookupAddress(accounts[0]);
        setEnsName(name);

        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);
        setAccountBalance(bal);

        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };


    // Mint ERC721 token
    const askContractToMintNft = async () => {
  
      const CONTRACT_ADDRESS = "0xc134d653303c5c2baB45aC12305E925dc1B7d9cD";
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, mintNFT.abi, signer);
    
            connectedContract.on("mintNewChatPassNFT", (from, tokenId) => {
        console.log(from, tokenId.toNumber())
        alert(`Hey there! We've minted your NFT. Here's the link: <https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}>`)
    });
    
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mintNewChatPass();
    
            console.log("Mining...please wait.")
            await nftTxn.wait();
            console.log(nftTxn);
            console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
    
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error)
        }
      }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="connect-bottom">
      Connect Wallet
    </button>
  );
  
  return (
    <div className="App">
      <header className="App-header">
      {haveMetamask ? (
      <div className="App-header">
      {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="connect-bottom" onClick={askContractToMintNft}>
                Connect Wallet
              </button>
            )}
        <img src={logo} className="App-logo" alt="logo" />
        {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button className="mint-bottom" onClick={askContractToMintNft}>
            mint NFT
            </button>
         )}
        <div className='ether-accounts'>
        <p>Address: <span className="showAccount">{currentAccount}</span></p>
        <p>Wallet Balance: <span className="wallet-balance">{accountBalance}</span></p>
        <p>Ens: <span className="ensName">{EnsName}</span></p>
        </div>
         <div className='build-by'>
          Build by 0xkato
          </div>
        </div>
        ) : (
        <p>Please Install MataMask</p>
        )}
        
      </header>
    </div>
  );
};

export default App;
