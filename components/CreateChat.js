import { useState } from 'react';
import { addChat } from '../lib/api';

export default ({ chats, setRoomId, host }) => {
    const [chatName, setChatName] = useState('');
    const handleSubmit = () => {
        addChat({ chatName, host }).then(() => {
            setRoomId(chats.length);
        })
    }
    return (
        <div>
            <div>
                <h1>Chreate chat</h1>
                <label className="special">Chat name</label>
                <input onChange={(e) => setChatName(e.target.value)} placeholder="be creative" />
                <button onClick={handleSubmit}>Create chat</button>
            </div>
            <hr />
            <div>
                <h1 style={{ textAlign: "center" }}>Join Chat</h1>
                {chats !== [] && chats.map((chat, indx) =>
                    <div className="chat" key={indx} onClick={() => setRoomId(indx)}>
                        <span>Chat name: </span>
                        <span className="special">{chat.chatName}</span>
                        <h3 className="special">Host: {chat.host}</h3>
                        <div>
                            <span className="bullet">&#x25cf;</span>
                            <span className="num">{1}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}