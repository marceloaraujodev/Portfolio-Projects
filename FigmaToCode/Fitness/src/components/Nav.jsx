import c from './Nav.module.css';

export default function Nav() {
  return (
    <div className={c.container}>
      <span className={c.logo}>WORKOUT</span>
      <ul className={c.navUl}>
        <li>EXERCISES</li>
        <li>TRAINERS</li>
        <li>PRICES</li>
        <li>LOGIN</li>
      </ul>
    </div>
  )
}
