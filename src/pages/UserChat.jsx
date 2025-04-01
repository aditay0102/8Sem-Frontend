import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";

const UserChat = () => {
    const [socket, setSocket] = useState(null); // State to store socket connection
    const [roomId, setRoomId] = useState(""); // State to store the room ID input
    const [message, setMessage] = useState(""); // State for message input
    const [messages, setMessages] = useState([]); // State to store received messages
    const messagesEndRef = useRef(null); // Ref for the messages container
    
    let location = useLocation();
    let Socket = process.env.REACT_APP_SOCKET;

    let userName = localStorage.getItem('userName');

    let userId = location.state.userId;
    useEffect(() => {
        console.log(userName)
        if(userId){
            setRoomId(userId);
        }
       
        // Establish socket connection when component mounts
        // const newSocket = io(`${address}`); // Replace with your server URL
        const newSocket = io(`${Socket}`); // Replace with your server URL
        setSocket(newSocket);

        
        // Clean up on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

  

    
    const joinRoom = () => {
        if (socket && roomId) {
            socket.emit("join_room", roomId);
            console.log(`Joined room: ${roomId}`);
        }
    };
    

    const sendMessage = () => {
        if (socket && message && roomId) {
            const messageData = {
                room: roomId,
                content: message,
                sender:userName , // Replace with actual user identifier
            };

            socket.emit("send_message", messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setMessage("");
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("previous_messages", (messages) => {
                setMessages(messages); // Load previous messages into state
            });

            socket.on("receive_message", (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });

            joinRoom();
        }
    }, [socket]);

    useEffect(() => {
        // Scroll to the bottom of the messages container
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]); // Trigger this effect every time messages change

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Messages</h2>
           
            <div>
              
                <div
                    ref={messagesEndRef} // Attach the ref to the messages container
                    className="space-y-3 bg-white p-4 border border-gray-300 rounded-lg h-60 overflow-y-auto"
                >
                    {messages.map((msg, index) => (
                        <div key={index} className="flex items-start space-x-2">
                            <span className="font-bold text-gray-700">{msg.sender}:</span>
                            <span className="text-gray-600">{msg.content}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}

                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default UserChat;