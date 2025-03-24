import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [socketId, setSocketId] = useState("");
  const [room, setRoom] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("message-received", (data) => {
      console.log("Message received:", data);
      setAllMessages((prev) => [...prev, { message: data[0], senderId: data[1] }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && room.trim()) {
      socket.emit("message", { message, room });
      setMessage("");
    }
  };

  return (
    <>
      <h1>Chat App</h1>
      <p>Socket ID: {socketId}</p>

      <label htmlFor="room">Room:</label>
      <input
        name="room"
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <br />

      <label htmlFor="message">Message:</label>
      <input
        name="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <button onClick={handleSend}>Send</button>

      <h2>All Messages</h2>
      <ul>
        {allMessages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;


// import { useEffect, useState, useMemo } from "react";
// import { io } from "socket.io-client";
// import "./App.css";

// function App() {
//   const [socketId, setSocketId] = useState("");
//   const [room,setRoom] = useState("")
//   const socket = useMemo(() => io(`http://localhost:3000`),[]);
//   const [message, setMessage] = useState("");
//   const [allMessage, setAllMessage] = useState([]);
//   const [senderId,setSenderId] = useState("")
//   console.log(allMessage);
  

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id)
//       console.log("socket id", socket.id);
//     });
//     socket.on("welcome", (s) => {
//       console.log("welcome",s);
//     });
//     socket.on("message-received", (data) => {
//       console.log("message recieved",data);
//       setAllMessage((allMessage)=>[...allMessage,data[0]])
//       setSenderId(data[1])
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   const handleSend = (e) => {
//     e.preventDefault();
   
//     socket.emit("message",{ message,room});

//     setMessage("");
//     setRoom("")
//   };

//   return (
//     <>
//       <h1>Chat App</h1>
//       <p>{socketId}</p>
//     <label htmlFor="room">Room</label>
//       <input
//         name="room"
//         type="text"
//         value={room}
//         onChange={(e) => {
//           setRoom(e.target.value);
//         }}
//       />
//       <br />
//       <label htmlFor="message">Message</label>

//       <input
//         name="message"
//         type="text"
//         value={message}
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />

//       <br />

//       <button onClick={(e) => handleSend(e)}>Send</button>
//       <br />

// <p>All Messages</p>
//       {allMessage.map((message,index)=>{
//         return  message
     
//       })}
//           </>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./App.css";

// function App() {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected with socket id", newSocket.id);
//     });

//     newSocket.on("message-received", (data) => {
//       console.log("Message received:", data);
//     });

//     return () => newSocket.disconnect();
//   }, []); // Empty dependency array ensures this runs only once

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (socket && message.trim()) {
//       socket.emit("message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <>
//       <h1>Chat App</h1>
//       <input
//         name="message"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSend}>Send</button>
//     </>
//   );
// }

// export default App;

