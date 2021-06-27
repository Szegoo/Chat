import React from 'react';
export default ({ setUsername }) => {
	let username = "";
	return (
		<form className="login-form" onSubmit={(e) => {
			e.preventDefault();
			setUsername(username);
		}}>
			<label>Type in a username</label>
			<input id="login-input" onChange={(e) => {
				username = e.target.value;
			}} placeholder="username" />
			<button id="login-button" type="submit">Join the chat</button>
		</form>
	)
}