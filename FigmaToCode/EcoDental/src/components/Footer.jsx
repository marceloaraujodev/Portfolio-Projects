import c from './Footer.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className={c.container}>
      <div className={c.containerInner}>
        <div className={c.blockLeft}>
          <img src="/footerlogo.png" alt="logo" />
          <p>
            Eco Dental is your go-to destination for premium natural oral care
            products. We are dedicated to providing you with a holistic approach
            to dental hygiene, harnessing the power of nature to promote a
            healthy smile.
          </p>
          <div className={c.social}>
            <img src="/Facebook-Icon.png" alt="logo" />
            <img src="/Linkedin-Icon.png" alt="logo" />
            <img src="/Instagram-Icon.png" alt="logo" />
            <img src="/Twitter-Icon.png" alt="logo" />
            <img src="/Youtube-Icon.png" alt="logo" />
          </div>
        </div>

        <div className={c.blockCenter}>
          <span className={c.title}>Quick Links</span>
          <div className={c.links}>
            <p>Our Story</p>
            <p>Contact Us</p>
            <p>Shipping & Delivery</p>
          </div>
        </div>

        <div className={c.blockRight}>
          <p className={c.title}>
          Receive offers & discounts via e-mail
          </p>
          <div className={c.details}>
            <input type='email' placeholder=' Enter Email' />
            <button className={c.btn}>Subscribe</button>
          </div>
        </div>
      </div>
      <hr />
      <div className={c.copy}>
        <p>© 2024, Eco Dental - All rights reserved.</p>
        <div className={c.terms}>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Refund Policy</p>
        </div>
      </div>
    </footer>
  );
}
