/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { url } from '../apiConfig';

// this is a test

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
    if(!userInfo){
        const response = await fetch(
          `${url}/profile`
          // 'http://localhost:4000/profile' // dev
          // 'https://blog-rzyw.onrender.com/profile'
          , {
          credentials: 'include',
        });
        const userData = await response.json();
        setUserInfo(userData)
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  // }, [userInfo, setUserInfo]); 

  function logout(){
    fetch(
      `${url}/logout`,
      // 'http://localhost:4000/logout' , // dev
      // 'https://blog-rzyw.onrender.com/logout',
     {
      credentials: 'include',
      method: 'POST'
    });

    setUserInfo(null)
    navigate('/');
  }
  const username = userInfo?.username;

  return (
    <>
    <header>
      <Link to="/" className="logo">
        IT FASHION BLOG
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
    <hr className='divider'/>
    </>
  );
}
