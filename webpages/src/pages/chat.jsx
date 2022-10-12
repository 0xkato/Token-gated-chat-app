import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import "./chat.css";
import moment from "moment";
import abi from "../utils/Mint.json";
import { ethers } from "ethers";
import { Link } from "react-router-dom";



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
const [IsANFTHolder, setIsANFTHolder] = useState(false);
const [currentAccount, setCurrentAccount] = useState("");
const [isConnected, setIsConnected] = useState(false);

const { ethereum } = window;
  
  // The smart contract address
  const CONTRACT_ADDRESS="0xc134d653303c5c2baB45aC12305E925dc1B7d9cD";

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

      const address = await ethereum.request({ method: 'eth_requestAccounts', });

      setCurrentAccount(address[0]); 

      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

    // This will check if your wallet have a balance of more than 0. 
    // If it's true, it means the wallet contains an NFT from your contract.
  const isNFTHolder = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const MINTCONTRACT = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
    const tokensOwned = await MINTCONTRACT.balanceOf(signer.getAddress());
    //This shows number of tokens owned by the users wallet
    const OwnedTokens = Number(tokensOwned);
    console.log("tokensOwned: ", OwnedTokens)
    try {
    if (OwnedTokens >= 1){
      setIsANFTHolder(true);
    }} catch (error) {
      setIsANFTHolder(false);
    }
    return parseInt(tokensOwned, 10) > 0;
  };

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
      });

    const messages = gun.get('messages')
    messages.map().on((message, id) => {
      dispatch(message)
    })
  }, [])

  return (
    <div className="Chat"> 
      {isConnected ? (

      <div className='NFTholder'>

      {IsANFTHolder ? (

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
        <Link to="/Mint"><button className='mint-bottom'>Mint Chatpass</button></Link>
      )}
      
      </div>
      
      ) : (
        <button className="mint-bottom" onClick={connectWallet}>
        connect wallet
        </button>
     )}

    </div>
  );
}