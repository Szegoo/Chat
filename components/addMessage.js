import { io } from 'socket.io-client'
import React, { useState } from 'react';
import RecordRTC from 'recordrtc'

export default ({ username, id }) => {
    const [stateText, setText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordAudio, setRecordAudio] = useState({});
    const socket = io('/');
    const sayHello = (e = null, text = null) => {
        if (e)
            e.preventDefault();
        socket.emit(`message`, {
            text: text || stateText,
            name: username,
            id
        });
        setText("");
    }
    const getAudio = (start) => {
        if(start) {
            navigator.getUserMedia({
                audio: true
            }, (stream) => {
                let newRecordAudio = RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/webm',
                    sampleRate: 44100,
                    recorderType: RecordRTC.StereoAudioRecorder,
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1
                });
                newRecordAudio.startRecording();
                setRecordAudio(newRecordAudio);
            }, (err) => console.log(err));
        }else {
            console.log(recordAudio);
            recordAudio.stopRecording(function() {
                recordAudio.getDataURL(function(audioDataURL) {
                    socket.emit('audio', {dataURL: audioDataURL, id});
                })
            })
        }
    }
    const sendEmoji = (emoji) => {
        sayHello(null, emoji);
    }
    const toggleRecording = async(start) => {
        setIsRecording(prev => !prev);
        getAudio(start);
    }
    return (
        <form onSubmit={(e) => sayHello(e)}>
            <label htmlFor="message">Enter a message {username}!</label>
            <input value={stateText} placeholder="poruka" name="message" onChange={(e) => setText(e.target.value)} />
            <div className="flex">
                <span onClick={() => sendEmoji(":smile")} className="emoji">&#128512;</span>
                <span onClick={() => sendEmoji(":cow")} className="emoji">&#128046;</span>
                <span onClick={() => sendEmoji(":ok")} className="emoji">&#128077;</span>
                {isRecording? 
                <img onClick={() => toggleRecording(false)} src="./static/mic2.svg"/>
                :
                <img onClick={() => toggleRecording(true)} src="./static/mic.svg"/>
                }
            </div>
            <button id="add-message-button" type="submit" >Send Message</button>
        </form>
    )
}