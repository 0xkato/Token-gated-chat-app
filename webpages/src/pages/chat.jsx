import { useEffect, useState, useReducer  } from "react";
import Gun from "gun";

const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})

const initialState = {
  messsages: []
}

function reducer(state, meassage) {
  return {
    meassage: [message, ...state.message]
  }
}

export default function chat() {
  const [fromState, setForm] = useState({
    name: '', message: ''
  })

  const [state, dispatch] = useReducer(reducer, initialState)

  function onChange(e){
    setForm({ ...fromState, [e.target.name]: e.target.value })
  }

}