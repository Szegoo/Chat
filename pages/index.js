import { io } from 'socket.io-client';
import React from 'react';
import AddMessage from '../components/addMessage';
import Login from '../components/Login';
import { getChats } from '../lib/api';
import Messages from '../components/Messages/messages';
import CreateChat from '../components/CreateChat';

export default class Index extends React.Component {
    state = {
        messages: [{ isText: true, text: "" }],
        username: "",
        chats: [],
        id: -1
    }
    socket = io('/');
    componentDidMount() {
        getChats().then((data) => {
            this.setState({ chats: data });
        });
        Notification.requestPermission();
    }
    setUsername = (username) => {
        this.setState({ username });
    }
    setRoomId = (id) => {
        const { chats } = this.state;
        new Notification("Somebody joined the " + chats[id].chatName + " chat");
        console.log('setRoomId called');
        const { username } = this.state;
        this.setState({ id });
        this.socket.emit('connection', username);
        this.socket.on(`message${id}`, text => {
            let { messages } = this.state;
            console.log(text);
            messages.push({ text: text, isText: true });
            this.setState({ messages });
        });
        this.socket.on('connection', text => {
            let { messages } = this.state;
            messages.push({ text: text, isText: false });
            this.setState({ messages });
        });
        this.socket.on('audio' + id, dataURL => {
            let audio = new Audio(dataURL);
            audio.play();
        })
        this.socket.on('left', (text) => {
            console.log(text);
        });
    }
    render() {
        const { username, messages, chats, id } = this.state;
        return (
            <div>
                <h1 onClick={() => this.setState({ id: -1 })} className="home">SinHouse</h1>
                <h1 className="title">Room {id + 1}</h1>
                {username === "" ?
                    <Login setUsername={this.setUsername} />
                    : (
                        <div>
                            {id !== -1 ?
                                <div>
                                    <AddMessage id={id} username={username} />
                                    <Messages messages={messages} />
                                </div>
                                :
                                <CreateChat host={username} setRoomId={this.setRoomId} chats={chats} />
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}