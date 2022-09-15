import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import "./chat.css"
import moment from "moment"
import "../App"
import { useAccount } from "wagmi";

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

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

export default function Chat() {
  const { address } = useAccount();                             // Hook to fetch your wallet address
  const contractAddress = "0x512cebB7aC6c754301FA7E2A4D405fd9608d8a7f";        // Your smart contract address

  const isNFTHolder = async () => {
    const API_KEY = "D4RAV269VAHZ5V2P39GFQ88XXYYG85UYUA";
    const CONTRACT_ADDRESS = "";
    const baseURL = `https://api.etherscan.io/api?
                module=account&action=tokennfttx&
                contractaddress=${CONTRACT_ADDRESS}&
                address=${address}&
                page=1&
                offset=100&
                startblock=0&
                sort=asc&
                apikey=${API_KEY}`
                
    const data = await fetch(baseURL);
    
    // Loop through array to see if the contract sent any NFT to your account
    // If it exist, it'll return true
    data.result.map(result => {
      if (result.to === address) {
        return true;
      }
    });
   
    return false;
  };


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

   // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    isNFTHolder(contractAddress);
    const messages = gun.get('messages')
    messages.map().on(m => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt
      })
    })
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
            <h4>Date: {moment(message.createdAt).format("LLLL")}</h4>
            </div>
          </div>
        ))
      }
    </div>
  );
}