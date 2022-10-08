import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import "./chat.css";
import moment from "moment";
import "../App.jsx";
import abi from "../utils/Mint.json";
import { ethers } from "ethers";
import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
import { useAccount, useContract, useProvider } from "wagmi";



// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:3030'
  ]
})

// create the initial state to hold the messages
const initialState = {
  messages: []
}


export default function Chat() {

const [haveMetamask, sethaveMetamask] = useState(true);
const [currentAccount, setCurrentAccount] = useState("");
const [accountBalance, setAccountBalance] = useState("");
const [isConnected, setIsConnected] = useState(false);

const { ethereum } = window;
const provider = useProvider();


let NFTHolder = false;

  // contract abi from Mint.json
  const contractABI = abi.abi;

  // Hook to fetch your wallet address
  const { userAddress } = currentAccount; 
  
  // Your smart contract address
  const CONTRACT_ADDRESS="0xc134d653303c5c2baB45aC12305E925dc1B7d9cD";

  // Hook to fetch contract interface
  const contract = useContract({                                               
      addressOrName: CONTRACT_ADDRESS,
      contractInterface: contractABI,
      signerOrProvider: provider,
  });

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

  const [formState, setForm] = useState({
    name: '', message: ''
  })

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(reducer, initialState)

  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const messages = gun.get('messages')
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now()
    })
    setForm({
      name: '', message: ''
    })
  }

  // update the form state as the user types
  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts', });

      setCurrentAccount(accounts[0]); 

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountBalance(bal);

      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const isNFTHolder = async () => {
    const CONTRACT_ADDRESS = "";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // This will check if your wallet have a balance of more than 0. 
    // If it's true, it means the wallet contains an NFT from your contract.
    console.log("test");
    const tokensOwned = await contract.methods.balanceOf(userAddress).call();
    return tokensOwned;
  };

  console.log(tokensOwned);

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const { ethereum } = window; 
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        sethaveMetamask(true);
      };
      checkMetamaskAvailability();

      isNFTHolder().then((result) => {
        console.log('isNFTHolder results',result);
      }
      );

    const messages = gun.get('messages')
    messages.map().on((message, id) => {
      dispatch(message)
    })


  }, [])

  return (
    <div className="Chat"> 
      {isConnected ? (

      <div style={{ padding: 30 }}>
      <input
        maxLength={20} 
        onChange={onChange}
        placeholder="Name"
        name="name"
        value={formState.name}
      />
      <input
        maxLength={100} 
        onChange={onChange}
        placeholder="Message"
        name="message"
        value={formState.message}
      />
      <button onClick={saveMessage}>Send Message</button>
      {
        state.messages.map(message => (
          <div key={message.createdAt} className="msg-box" >
            <div className='msgs'>
            <h4>From: {message.name}</h4>
            <h4>{message.message}</h4>
            <h4>Date: {moment(message.createdAt).format("LLL")}</h4>
            </div>
          </div>
        ))
      }
      </div>
      ) : (
        <button className="mint-bottom" onClick={connectWallet}>
        connect wallet
        </button>
     )}

    </div>
  );
}