import lock_img from "./imgs/lock.png";
import chat_img from "./imgs/chat.png";

function Home() {
    
    return (
      <div className="Home">
    <h1>Home</h1>
    <p>Decent chat is a chatting platform, made with the intent of keeping the people of crypto Safe and sound,
       While comunicating both in terms of there assets but also there data.
    </p>


    <img src={lock_img} className="lock-img" alt="Lock-Icon"/>
    <p>no trancactions</p>

        <img src={chat_img} className="chat-img" alt="Chat-Icon"/> 
        <p>Chat with your friends or something</p>
        </div>

      
    );
  };
  
  export default Home;
  