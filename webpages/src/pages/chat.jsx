import React, { Component } from 'react';
import "./chat.css"

class Chat extends Component {
// going to be a full on chat 
  render() {
    return (
      <div>
          <div className="chat-room-header">
        <h1>Chat Room</h1>
          </div>
          <p className='chat-room-text'>going to be a chat Room for token holders! hi</p>
      </div>
    );
  }
}

export default Chat;