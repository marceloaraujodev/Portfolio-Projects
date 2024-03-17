/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';


export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(
          // 'http://localhost:4000/profile' // dev
          'https://blog-rzyw.onrender.com/profile'
          , {
          credentials: 'include',
        });
        const userData = await response.json();
        console.log('userData', userData)
        setUserInfo(userData)
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  // }, [userInfo, setUserInfo]); 

  function logout(){
    fetch(
      // 'http://localhost:4000/logout' , // dev
      'https://blog-rzyw.onrender.com/logout',
     {
      credentials: 'include',
      method: 'POST'
    });

    setUserInfo(null)
    navigate('/');
  }
  const username = userInfo?.username;
  console.log(username)

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


