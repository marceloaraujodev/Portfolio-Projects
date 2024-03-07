import React, { useContext, useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function login(event) {

    setIsLoggingIn(true);


    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setIsLoggingIn(true);
      alert('Wrong username or password');
    }
  }

  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button disabled={isLoggingIn}>
      {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
