import React from 'react';
export default ({messages}) => {
    return (
        <div>
            {messages.map((message, indx) =>
                <p className={`${message.isText ? "" : "special"}`} key={indx}>{message.text}</p>
            )}
        </div>
    )
}