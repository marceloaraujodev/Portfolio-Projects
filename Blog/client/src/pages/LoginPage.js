import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function login(event) {
    event.preventDefault();
    setIsLoggingIn(true);

    const response = await fetch(
      // 'http://localhost:4000/login',  // pro
      'https://blog-rzyw.onrender.com/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } 
    else {
      setIsLoggingIn(true);
      alert('Wrong username or password');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
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
