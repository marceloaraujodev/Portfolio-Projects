import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();

    // try {
    const response = await fetch('https://soft-star-9690.on.fleek.co/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // includes cookie here
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      throw new Error('Login failed');
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
        type="text"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
