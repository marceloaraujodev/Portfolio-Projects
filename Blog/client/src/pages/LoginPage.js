import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const loginMutation = useMutation(
    async (credentials) => {
      const response = await fetch(
        // 'http://localhost:4000/login',  // pro
        'https://blog-rzyw.onrender.com/login',
        {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      if(!response.ok){
        throw new Error('Login failed');
      }
      return await response.json();
    },
    {
      onSuccess: (data) => {
        setUserInfo(data);
        setRedirect(true)
      }
    },
    {
      onError: (error) => {
        setError(error.message);
        setIsLoggingIn(false);
      },
    }
  );
  

  async function login(event) {
    event.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      await loginMutation({username, password})
    } catch (error) {
      setError(error.message);
      setIsLoggingIn(false);
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


// const response = await fetch(
//   // 'http://localhost:4000/login',  // pro
//   'https://blog-rzyw.onrender.com/login',
//   {
//     method: 'POST',
//     body: JSON.stringify({ username, password }),
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//   }
// );

// if (response.ok) {
//   response.json().then((userInfo) => {
//     setUserInfo(userInfo);
//     setRedirect(true);
//   });
// } else {
//   setIsLoggingIn(true);
//   alert('Wrong username or password');
// }