import c from './Hero.module.css';

export default function Hero() {
  return (
    <div className={c.heroContainer}>
      <div className={c.heroImgContainer}>
        <img src="/Hero-Banner.png" alt="hero banner" className={c.heroImg} />
      </div>
      <div className={c.heroContent}>
        <div className={c.heroContentText}>
          <h1 className={c.heroTitle}>Echo - Friendly Smile</h1>
          <p className={c.heroSubTitle}>
            Transform Your Dental Routine with Eco-Friendly Toothbrushes
          </p>
        </div>

        <button className={c.heroBtn}>
          <div className={c.circleContainer}>
            <img src="/Icon-circle.png" alt="icon" />
          </div>
          <span className={c.shopNow}>SHOP NOW</span>
          <img src="/arrow_forward.png" alt="arrow" className={c.arrow}/>
        </button>
      </div>
    </div>
  );
}
