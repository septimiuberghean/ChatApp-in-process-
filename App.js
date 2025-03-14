import React, { useState } from 'react';
import Login from './Components/Login';
import ChatWindow from './Components/ChatWindow';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <ChatWindow user={user} chatroom={{ name: 'General Chat' }} />
            )}
        </div>
    );
};

export default App;
