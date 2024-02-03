/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => { // called immidiattely
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        });
        const data = await response.json();
        setUserInfo(data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    };
    fetchData();
  }, [setUserInfo]); 

  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    });

    setUserInfo(null)
  }
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Myblog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">+Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
