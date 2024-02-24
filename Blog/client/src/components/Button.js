import { Link } from 'react-router-dom';

export default function Button({to, onClick, children}) {

  function handleButtonClick(){
    if(onClick){
      onClick()
    }
  }

  return (
    <Link to={to} className='btn-main' onClick={handleButtonClick}>
        {children}
  </Link>
  )
}
