import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RegisterPage() {
  const [redirect, setRedirect] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    username: '',
    // email: '',
    password: '',
    // passwordConfirm: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log(name, value)
    setRegisterUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(registerUser)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://blog-rzyw.onrender.com/register',
        {
          method: 'POST',
          body: JSON.stringify(registerUser),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      // console.log(response);

      if (response.status === 200) {
        alert('registrations successful');
        setRedirect(true);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.log('Error during registration');
      alert('Registration failed, Please try again');
    }

    //// clears registration fields
    // setRegisterUser({
    //   username: '',
    //   // email: '',
    //   password: '',
    //   // passwordConfirm: ''
    // })
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={registerUser.username}
        onChange={handleChange}
      />
      {/* <input type='text' placeholder='Email' name="email" value={registerUser.email}  onChange={handleChange}/> */}
      <input
        type="text"
        placeholder="Password"
        name="password"
        value={registerUser.password}
        onChange={handleChange}
      />
      {/* <input type='text' placeholder='Confirm Password' name="passwordConfirm" value={registerUser.passwordConfirm}  onChange={handleChange}/> */}
      <button>Register</button>
    </form>
  );
}
