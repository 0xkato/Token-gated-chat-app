import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import "./chat.css";
import moment from "moment";
import "../App.jsx";
import abi from "../utils/Mint.json";
import { ethers } from "ethers";
import { useAccount, useContract } from "wagmi";


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

  let NFTHolder = false;

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

  const contractABI = abi.abi;
  const { account } = useAccount();      
  const address = account;                                                     // Hook to fetch your wallet address
  const contractAddress = "0xc134d653303c5c2baB45aC12305E925dc1B7d9cD";        // Your smart contract address
  const contract = useContract({                                               // Hook to fetch contract interface
      addressOrName: contractAddress,
      contractInterface: contractABI,
  });

  console.log(account);

  const isNFTHolder = async () => {
    // This will check if your wallet have a balance of more than 0. 
    // If it's true, it means the wallet contains an NFT from your contract.
    const data = await contract.balanceOf(address);
    if (data > 0){
      NFTHolder = true;
    }
  };
  console.log(NFTHolder);
  console.log(contractABI);

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = gun.get('messages')
    messages.map().on((message, id) => {
      dispatch(message)
    })

    isNFTHolder().then((result) => {
      console.log('isNFTHolder results',result);
    }
    );

  }, [])

  return (
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
  );
}