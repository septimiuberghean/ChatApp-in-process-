import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatWindow = ({ user, chatroom }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);   
    const messagesEndRef = useRef(null);

    // Initialize WebSocket connection
    useEffect(() => {
        const socket = new SockJS('/chat');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                setIsConnected(true);  
                // Subscribe to the /topic/messages to receive incoming messages
                client.subscribe('/topic/messages', (messageOutput) => {
                    const newMessage = JSON.parse(messageOutput.body);
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
            onDisconnect: () => {
                setIsConnected(false);  
            }
        });

        client.activate();  //start the WebSocket connection

        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();  
            }
        };
    }, []);

    // Scroll to the bottom of the chat when new messages are received
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    //new MESSAGE IS SENT TO WEB SOCKET HERE
    const handleSendMessage = async () => {
        if (message.trim() === '' || !isConnected) return;   

        const newMessage = {
            sender: { id: user.id, username: user.username },  
            content: message,
            chatroom: { id: chatroom.id }
        };
 
        stompClient.publish({
            destination: '/app/sendMessage',   
            body: JSON.stringify(newMessage),
        });

        setMessage('');  
    };

    return (
        <div style={styles.chatContainer}>
            <h2>{chatroom.name}</h2>
            <div style={styles.messagesContainer}>
                {messages.map(msg => (
                    <p key={msg.id} style={styles.message}>
                        <strong>{msg.sender.username}:</strong> {msg.content}  {/* Display sender's username */}
                    </p>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.input}
            />
            <button onClick={handleSendMessage} style={styles.button}>Send</button>
        </div>
    );
};

const styles = {
    chatContainer: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        maxWidth: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
    },
    messagesContainer: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        padding: '5px',
        background: '#f9f9f9',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    message: {
        marginBottom: '8px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        marginBottom: '10px',
    },
    button: {
        padding: '8px 12px',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default ChatWindow;
