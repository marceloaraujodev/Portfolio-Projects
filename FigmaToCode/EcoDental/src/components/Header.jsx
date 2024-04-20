import c from './Header.module.css';

export default function Header() {
  return (
    <>
      <div className={c.container}>
        <div className={c.headerContainer}>
          <img src="/logo.png" alt="logo" />
          <nav className={c.nav}>
            <div className={c.navCenterBox}>
              <ul>
                <li>
                  <span className={c.home}>Home</span>
 
                </li>
                <li>
                  teeth whitening
                  <div className={c.arrowContainer}>
                    <img
                      src="/arrowDown.png"
                      alt="arrow"
                      className={c.arrowDown}
                    />
                  </div>
                </li>
                <li>
                  toothpaste
                  <div className={c.arrowContainer}>
                    <img
                      src="/arrowDown.png"
                      alt="arrow"
                      className={c.arrowDown}
                    />
                  </div>
                </li>
                <li>
                  mouth wash
                  <div className={c.arrowContainer}>
                    <img
                      src="/arrowDown.png"
                      alt="arrow"
                      className={c.arrowDown}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className={c.navRightBox}>
              <img src="/profile-icon.png" alt="profile-icon" />
              <img src="/cart-icon.png" alt="cart-icon" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

{
  /* <img src="/profile-icon.png" alt="profile-icon" />
<img src="/cart-icon.png" alt="cart-icon" /> */
}
