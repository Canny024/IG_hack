import "./ChatPage.css"
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

function ChatPage() {
  const roomId=localStorage.getItem('userName');
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(roomId);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="chatApp">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatPage;