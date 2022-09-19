import lock_img from "./imgs/no-log.png";
import chat_img from "./imgs/chat.png";
import "./Home.css";

function Home() {
    
    return (
      <div className="Home">
        <div className="home-text">
    <h1>SuperChat</h1>
    <p>This is a chatting platform, Where you you will have to mint a Chat Pass to be able to chat</p>
    </div>
    
    <div className="features">
    <img src={lock_img} className="lock-img" alt="Lock-Icon"/>

    <img src={chat_img} className="chat-img" alt="Chat-Icon"/> 
    </div>

        <p className="lock-text">NO TRANCACTIONS</p>
        <p className="chat-text">CHAT WITH YOUR FRIENDS OR SOMETHING</p>
    
    </div>

      
    );
  };
  
  export default Home;
  